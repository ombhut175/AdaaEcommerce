const user = require('../models/User')
const jwt = require('jsonwebtoken');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary} = require("../services/cloudinary");


async function changeProfilePicture(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded'});
        }
        const user = await giveUserFromDb(req.cookies.userId);
        if (!user) {
            return res.status(400).json({message: 'No user found'});
        }
        const localFilePath = req.file.path; // Path to the uploaded file in ./public/temp
        const response = await uploadOnCloudinary(localFilePath, `profile_pictures/${user._id}`);
        if (response) {
            user.profilePicture = response.url;
            await user.save();
            res.status(200).json({
                message: 'File uploaded successfully to Cloudinary',
                url: response.url
            });
        } else {
            res.status(500).json({error: 'Failed to upload file to Cloudinary'});
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({error: 'An error occurred while uploading the file'});
    }
}

async function setProfilePictureToDefault(req, res) {
    try {
        const user = await giveUserFromDb(req.cookies.userId);
        if (!user) {
            return res.status(400).json({message: 'No user found'});
        }
        const defaultImg = await user.schema.path('profilePicture').default;
        user.profilePicture = defaultImg;
        await user.save();
        return res.status(200).send({url: defaultImg});
    } catch (error) {
        return res.status(500).json({error: 'An error occurred while setting the default image'});
    }
}

module.exports = {
    changeProfilePicture,
    setProfilePictureToDefault,
}
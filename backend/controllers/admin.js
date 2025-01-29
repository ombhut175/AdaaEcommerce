const User = require('../models/User');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary} = require("../services/cloudinary");

async function changeImages(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded'});
        }
        const user = await giveUserFromDb(req.cookies.userId);
        if (!user) {
            return res.status(400).json({message: 'No user found'});
        }
        const localFilePath = req.file.path; // Path to the uploaded file in ./public/temp
        const {section} = req.body;

        const response = await uploadOnCloudinary(localFilePath, `staticPictures/${user._id}/section`,`staticPictures/${user._id}/section`);
        if (response) {
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
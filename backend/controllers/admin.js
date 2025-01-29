const User = require('../models/User');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary} = require("../services/cloudinary");
const StaticImages = require('../models/StaticImages');
const {giveUserIdFromCookies} = require("../services/auth");

async function changeImages(req, res) {
    try {
        console.log("from changeImages");
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded'});
        }
        const user = await giveUserFromDb(req.cookies.authToken);
        console.log(user);
        if (!user) {
            return res.status(400).json({message: 'No user found'});
        }
        const localFilePath = req.file.path; // Path to the uploaded file in ./public/temp
        const {section, part} = req.body;
        console.log(`section = ${section} part = ${part}`);

        const response = await uploadOnCloudinary(localFilePath, `staticPictures/${user._id}/${section}`, `${user._id}${section}${part}`);

        if (response) {
            const updateQuery = {[`${section}.${part}`]: response.url};

            const updatedStaticImages = await StaticImages.findOneAndUpdate(
                {}, // Find the only document
                {$set: updateQuery}, // Update only the specific field
                {new: true, upsert: true} // Return updated document, create if not exists
            );
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


async function getOrCreateStaticImages() {
    try {
        const staticImages = await StaticImages.findOne();

        if (!staticImages) {
            console.log("Creating default StaticImages document...");
            return await StaticImages.create({});
        }

        return staticImages;
    } catch (error) {
        console.error("Error in getOrCreateStaticImages:", error);
    }
}

// Update static images (instead of creating multiple documents)
async function updateStaticImages(updateData) {
    try {
        return await StaticImages.findOneAndUpdate(
            {},  // Find the first (and only) document
            {$set: updateData},
            {new: true, upsert: true} // Create if not exists
        );
    } catch (error) {
        console.error("Error updating StaticImages:", error);
    }
}

async function giveStaticImages(req, res) {
    try {
        const staticImages = await StaticImages.findOne({});
        return res.status(200).json(staticImages);
    }catch (e) {
        console.error("Error in giveStaticImages:", e);
        return res.status(400).json({error: 'Failed to giveStaticImages'});
    }
}

module.exports = {
    getOrCreateStaticImages,
    updateStaticImages,
    changeImages,
    giveStaticImages
};

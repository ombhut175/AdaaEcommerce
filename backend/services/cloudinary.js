require('dotenv').config({path: '../.env'});
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (localFilePath, publicId) => {
    try {
        if (!localFilePath) return null;

        // Upload the file with a consistent public_id for each user
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            public_id: publicId, // Ensures same public_id is used to overwrite
            overwrite: true // Ensures existing file with same public_id is replaced
        });

        // Remove the locally saved temporary file after upload
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        // Remove the locally saved temporary file if the upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.log('Error uploading to Cloudinary:', error);
        return null;
    }
};


const uploadOnCloudinaryForProducts = async (localFilePath, dealerAndProductDetails) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            public_id: dealerAndProductDetails.publicId,
            overwrite: true,
            folder: dealerAndProductDetails.folderPath,
        });

        // Delete file only after successful upload
        if (response && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null; // Do not delete the file on failure
    }
};



module.exports = {
    uploadOnCloudinary,
    uploadOnCloudinaryForProducts,
}
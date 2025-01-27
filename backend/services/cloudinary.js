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


const uploadOnCloudinaryForProducts = async (localFilePath, dealerAndProductDetails = {}) => {
    try {
        if (!localFilePath) {
            console.error('No local file path provided');
            return null;
        }

        // Ensure we have required parameters with fallback values
        const folderPath = dealerAndProductDetails.folderPath || 'temp_uploads';
        const publicId = dealerAndProductDetails.publicId || `file_${Date.now()}`;

        // Sanitize parameters
        const sanitizedFolder = folderPath.replace(/#/g, '').replace(/[^a-zA-Z0-9/_\-]/g, '');
        const sanitizedPublicId = publicId.replace(/#/g, '').replace(/[^a-zA-Z0-9_\-]/g, '');

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            public_id: sanitizedPublicId,
            overwrite: true,
            folder: sanitizedFolder,
        });

        // Clean up local file
        // if (response && fs.existsSync(localFilePath)) {
        //     fs.unlinkSync(localFilePath);
        // }

        return response;
    } catch (error) {
        console.error('Cloudinary upload error:', {
            message: error.message,
            details: {
                file: localFilePath,
                folderPath: dealerAndProductDetails?.folderPath,
                publicId: dealerAndProductDetails?.publicId
            }
        });
        return null;
    }
};


module.exports = {
    uploadOnCloudinary,
    uploadOnCloudinaryForProducts,
}
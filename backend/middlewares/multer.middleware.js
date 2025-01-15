const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {giveUserFromDb} = require("../services/common.services");

// Define the temp directory relative to this script
const tempDir = path.join(__dirname, '../public/temp');

// Ensure the temp directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

//storage for userProfile
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: async function (req, file, cb) {
        try {
            const user = await giveUserFromDb(req.cookies.userId);
            if (!user) {
                return cb(new Error('No user found'), false);
            }

            const nameOfFile = `${user._id}${path.extname(file.originalname)}`;
            const localFilePath = path.join(tempDir, nameOfFile);


            // Check if the file exists and delete it if necessary
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }
            cb(null, nameOfFile);
        } catch (e) {
            console.error('Error in filename callback:', e);
            cb(e, false);
        }
    }
});

const storageForProducts = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create a folder for user and product dynamically
        const { userId, productId } = req.params; // Assuming userId and productId are passed in the route
        const dir = path.join(__dirname, `uploads/${userId}/${productId}`);
        fs.mkdirSync(dir, { recursive: true }); // Ensure the folder structure exists
        cb(null, dir); // Save files to this folder
    },
    filename: (req, file, cb) => {
        // Naming files based on index (i.e., file_1.jpg, file_2.jpg, ...)
        const index = req.files.indexOf(file) + 1;
        cb(null, `file_${index}${path.extname(file.originalname)}`); // Preserve file extension
    },
});

const upload = multer({ storage: storage });
const uploadForProducts = multer({storage : storageForProducts});

module.exports = upload;
module.exports = uploadForProducts;
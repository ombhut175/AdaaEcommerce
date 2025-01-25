const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {giveUserFromDb} = require("../services/common.services");
const {giveUserIdFromCookies} = require("../services/auth");

// Define the temp directory relative to this script
const tempDir = path.join(__dirname, '../public/temp');

// Ensure the temp directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {recursive: true});
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
        try {
            const userId = giveUserIdFromCookies(req.cookies.authToken);
            if (!userId) {
                return cb(new Error("Invalid user ID"), false);
            }

            const colorName = file.fieldname;
            if (!colorName) {
                return cb(new Error("Color name is missing in fieldname"), false);
            }

            const dir = path.join(tempDir, userId, colorName);
            fs.mkdirSync(dir, { recursive: true });

            cb(null, dir);
        } catch (error) {
            console.error("Error in destination callback:", error);
            cb(new Error("Failed to set upload directory"), false);
        }
    },
    filename: (req, file, cb) => {
        try {
            const colorName = file.fieldname;
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `${colorName}-${uniqueSuffix}${path.extname(file.originalname)}`;
            cb(null, filename);
        } catch (error) {
            console.error("Error in filename callback:", error);
            cb(new Error("Failed to set file name"), false);
        }
    },
});


const uploadForProducts = multer({
    storage: storageForProducts,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
});




const upload = multer({storage: storage});


module.exports = upload;
module.exports = uploadForProducts;
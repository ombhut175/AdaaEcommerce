const User = require('../models/User');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary} = require("../services/cloudinary");
const StaticImages = require('../models/StaticImages');
const Orders = require('../models/Orders');
const {giveUserIdFromCookies} = require("../services/auth");
const {ObjectId} = require('mongoose').Types;

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


async function givePermission(req, res) {
    try {
        const { permission, userEmail } = req.body;

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if permission already exists to avoid duplicates
        if (!user.role.includes(permission)) {
            user.role.push(permission);
            await user.save(); // Save the updated document
        }

        return res.status(200).json({ message: 'User permission successfully updated' });
    } catch (e) {
        console.error("Error in givePermission:", e);
        return res.status(400).json({ error: 'Failed to give permission' });
    }
}

async function giveAllUsers(req, res) {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(400).json({ error: 'Users not found' });
        }
        return res.status(200).json(users);
    }catch (e) {
        console.error("Error in giveAllUsers:", e);
        return res.status(400).json({error: 'Failed to giveAllUsers'});
    }
}


async function deleteUser(req, res) {
    try {
        const {userId} = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    }catch (e) {
        console.error("Error in deleteUser:", e);
        return res.status(400).json({error: 'Failed to delete User'});
    }
}

async function removePermission(req, res) {
    try {
        const { permission, userEmail } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if the permission exists in the user's role array
        if (!user.role.includes(permission)) {
            return res.status(400).json({ error: 'Permission not found in user roles' });
        }

        // Remove the permission
        user.role = user.role.filter((role) => role !== permission);

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: 'Permission removed successfully', user });

    } catch (e) {
        console.error("Error in removePermission:", e);
        return res.status(500).json({ error: 'Failed to remove permission' });
    }
}

async function giveUserAndOrdersInfo(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const orders = await Orders.find({userId: new ObjectId(userId)});
        if (!orders) {
            return res.status(400).json({ error: 'User not found' });
        }
        return res.status(200).json({
            user,
            orders,
        })
    }catch (e) {
        console.error("Error in addProductToOrders:", e);
        return res.status(400).json({error: 'Failed to addProductToOrders'});
    }
}


module.exports = {
    getOrCreateStaticImages,
    updateStaticImages,
    changeImages,
    giveStaticImages,
    givePermission,
    giveAllUsers,
    deleteUser,
    removePermission,
    giveUserAndOrdersInfo
};

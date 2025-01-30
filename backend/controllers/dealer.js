const Product = require("../models/Product");
const {giveUserIdFromCookies, getUser} = require("../services/auth");
const {uploadOnCloudinaryForProducts} = require("../services/cloudinary");
const fs = require("node:fs");

const {ObjectId} = require('mongoose').Types;


async function giveProducts(req, res) {
    try {
        console.log("from giveProducts");
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        console.log(userId);
        if (!userId) {
            return res.status(404).json({ error: "User not found" });
        }
        const products = await Product.find({dealerId: new ObjectId(userId)});
        console.log(products);
        return res.status(200).json(products);
    }catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
}


async function editProduct(req, res) {
    try {
        const {
            name,
            title,
            description,
            price,
            discount,
            stock,
            colorNames,
            colorValues
        } = req.body;

        // Validate color data
        const parsedColorNames = JSON.parse(colorNames);
        const parsedColorValues = JSON.parse(colorValues);

        if (!Array.isArray(parsedColorNames) ||
            !Array.isArray(parsedColorValues) ||
            parsedColorNames.length !== parsedColorValues.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid color data format"
            });
        }

        const user = getUser(req.cookies.authToken);

        // Create initial product structure
        const savedProduct = await Product.findOne({dealerId: new ObjectId(user.id)});


        // Process files if any
        if (req.files?.length > 0) {
            // Group files by color name
            const filesByColor = req.files.reduce((acc, file) => {
                const colorName = file.fieldname;
                acc[colorName] = acc[colorName] || [];
                acc[colorName].push(file);
                return acc;
            }, {});

            // Update each color with its images
            for (const color of savedProduct.colors) {
                const files = filesByColor[color.colorName] || [];
                const uploadPromises = files.map(async (file) => {
                    try {
                        const cleanColorName = color.colorName.replace(/[^a-zA-Z]/g, "");
                        const publicId = `${user.id}-${savedProduct._id}-${cleanColorName}-${Date.now()}`;

                        const result = await uploadOnCloudinaryForProducts(file.path, {
                            folderPath: `${user.id}/${savedProduct._id}/${cleanColorName}`,
                            publicId: publicId
                        });

                        await fs.promises.unlink(file.path);
                        return result?.secure_url;
                    } catch (uploadError) {
                        console.error("Upload failed for file:", file.originalname, uploadError);
                        return null;
                    }
                });

                const imageUrls = (await Promise.all(uploadPromises)).filter(url => url);
                color.images = imageUrls;
            }

            await savedProduct.save();
        }

        res.status(201).json({
            success: true,
            product: savedProduct
        });

    } catch (err) {
        // Cleanup files
        if (req.files) {
            req.files.forEach(file => fs.unlinkSync(file.path));
        }
        res.status(500).json({
            success: false,
            message: "Product creation failed",
            error: err.message
        });
    }
};

module.exports = {
    giveProducts,
    editProduct
};
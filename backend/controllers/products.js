const Product = require('../models/Product');
const UserActivities = require('../models/UserActivities');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary, uploadOnCloudinaryForProducts} = require("../services/cloudinary");
const {getUser, giveUserIdFromCookies} = require("../services/auth");
const {ObjectId} = require('mongoose').Types;
const fs = require("node:fs");



// Update addProduct controller
const addProduct = async (req, res) => {
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
        const newProduct = new Product({
            name,
            title,
            description,
            price: Number(price),
            discountPercent: Number(discount),
            stock: Number(stock),
            dealerId: user.id,
            colors: parsedColorNames.map((name, index) => ({
                colorName: name,
                colorValue: parsedColorValues[index],
                images: []
            }))
        });

        const savedProduct = await newProduct.save();

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




// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({success: true, products: products});
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to fetch products', error: error.message});
    }
};

// Get a single product by ID
const getProduct = async (req, res) => {
    
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to fetch product', error: error.message});
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    console.log("from updateProduct");
    console.log("Raw req.body:", req.body);
    console.log("Raw req.body.colorNames:", req.body.colorNames);
    console.log("Raw req.body.colorValues:", req.body.colorValues);
    console.log("Raw req.body.existingImagesByColor:", req.body.existingImagesByColor);

    const oldImageUrls = [];

    try {
        const {
            name,
            title,
            description,
            price,
            discount,
            stock,
            colorNames,
            colorValues,
            productId,
            existingImagesByColor: existingImagesStr
        } = req.body;

        // Validate required fields
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required for updates"
            });
        }

        // Parse incoming data
        const parsedColorNames = JSON.parse(colorNames);
        const parsedColorValues = JSON.parse(colorValues);
        const existingImagesByColor = JSON.parse(existingImagesStr);

        // Get existing product
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Track images to delete
        const colorsToProcess = new Set(parsedColorNames);

        // Process existing colors
        existingProduct.colors.forEach(color => {
            if (!colorsToProcess.has(color.colorName)) {
                // Color removed - mark all images for deletion
                oldImageUrls.push(...color.images);
            }
        });

        // Process updated colors
        const updatedColors = await Promise.all(parsedColorNames.map(async (colorName, index) => {
            const existingColor = existingProduct.colors.find(c => c.colorName === colorName);
            const existingImages = existingImagesByColor.find(c => c.colorName === colorName)?.existingUrls || [];

            // Filter images to keep
            const imagesToKeep = existingColor ?
                existingColor.images.filter(img => existingImages.includes(img)) :
                [];

            // Mark removed images for deletion
            if (existingColor) {
                const imagesToDelete = existingColor.images.filter(img => !existingImages.includes(img));
                oldImageUrls.push(...imagesToDelete);
            }

            // Process new uploads
            const newFiles = req.files?.filter(f => f.fieldname === colorName) || [];
            const newUrls = await uploadColorImages(req, newFiles, existingProduct._id, colorName);


            return {
                colorName,
                colorValue: parsedColorValues[index],
                images: [...imagesToKeep, ...newUrls]
            };
        }));

        // Update product fields
        existingProduct.name = name;
        existingProduct.title = title;
        existingProduct.description = description;
        existingProduct.price = Number(price);
        existingProduct.discountPercent = Number(discount);
        existingProduct.stock = Number(stock);
        existingProduct.colors = updatedColors;

        // Save updated product
        const updatedProduct = await existingProduct.save();

        // Cleanup old images after successful update
        await deleteCloudinaryImages(oldImageUrls);

        res.status(200).json({
            success: true,
            product: updatedProduct
        });

    } catch (err) {
        // Cleanup uploaded files on error
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                } else {
                    console.warn(`Warning: File not found for deletion: ${file.path}`);
                }
            });
        }
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Product update failed",
            error: err.message
        });
    }
};

// Helper function for image uploads
const uploadColorImages = async (req, files, productId, colorName) => {
    const user = getUser(req.cookies.authToken); // Now req is defined properly
    const uploadPromises = files.map(async (file) => {
        try {
            const cleanColorName = colorName.replace(/[^a-zA-Z]/g, "");
            const publicId = `${user.id}-${productId}-${cleanColorName}-${Date.now()}`;

            const result = await uploadOnCloudinaryForProducts(file.path, {
                folderPath: `${user.id}/${productId}/${cleanColorName}`,
                publicId
            });

            await fs.promises.unlink(file.path);
            return result?.secure_url;
        } catch (error) {
            console.error("Upload failed:", error);
            return null;
        }
    });

    return (await Promise.all(uploadPromises)).filter(url => url);
};


// Helper function for image deletion
const deleteCloudinaryImages = async (urls) => {
    try {
        await Promise.all(
            urls.map(async (url) => {
                const publicId = getPublicIdFromUrl(url);
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (error) {
                        console.error("Delete failed:", publicId, error);
                    }
                }
            })
        );
    }catch (e) {
        console.log(e)
    }
};

// Remove a product by ID
const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, message: 'Product removed successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to remove product', error: error.message});
    }
};

//filtration of products based on selection

const filterProduct = async (req, res) => {
    const {categoryOfProduct, priceRange, discountRange, size, color, material} = req.body;
    let filterData = {}
    try {
        //category
        if (categoryOfProduct) {
            filterData = {...filterData, categoryOfProduct: {$eq: categoryOfProduct}}
        }

        //prices
        if (priceRange) {
            const priceArray = priceRange.split("-")
            const max = priceArray[1]
            const min = priceArray[0]
            filterData = {...filterData, price: {$gte: Number(min), $lte: Number(max)}}
        }

        //discount
        if (discountRange) {
            const discountArray = discountRange.split("-")
            const max = discountArray[1]
            const min = discountArray[0]
            filterData = {...filterData, discountPercent: {$gte: Number(min), $lte: Number(max)}}
        }

        //size
        if (size) {
            filterData = {...filterData, size: {$in: size}}
        }

        //color
        if (color) {
            filterData = {...filterData, color: {$in: color}}
        }

        //material
        if (material) {
            filterData = {...filterData, material: {$in: material}}
        }

        let productsByFilter = await Product.find(filterData)
        productsByFilter = productsByFilter.filter((product) => product.stock > 0)

        if (productsByFilter.length === 0) {
            return res.json({success: true, msg: "Product not available"})
        }

        return res.json({success: true, msg: "Product available", productsByFilter})

    } catch (err) {
        console.log(":::  filtered error  ::: ", err);
    }

}


async function searchProducts(req, res) {
    try {
        const searchText = req.params.searchText;
        const searchRegex = new RegExp(searchText, 'i');  // 'i' for case-insensitive search

        // Fetch products based on the search text

        const products = await Product.find({
            $or: [
                { name: { $regex: searchRegex } },
                { title: { $regex: searchRegex } },
                { description: { $regex: searchRegex } },
            ],
        });

        console.log(products);

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }

        // Check if the user is authenticated and extract userId
        const token = req.cookies.authToken;
        if (token) {
            const userId = giveUserIdFromCookies(token);  // Assuming you have a method to extract user ID from the token

            if (userId) {
                let userActivities = await UserActivities.findOne({ userId });

                const searchedProductData = products.map(product => ({
                    productId: product._id,
                    searchTimestamp: new Date(),
                }));

                if (!userActivities) {
                    // If no activity document exists, create a new one
                    userActivities = new UserActivities({
                        userId,
                        searchedProducts: searchedProductData,
                    });
                    await userActivities.save();
                } else {
                    // If activities document exists, update it
                    await UserActivities.findOneAndUpdate(
                        { userId },
                        { $push: { searchedProducts: { $each: searchedProductData } } }, // Push multiple products
                        { upsert: true, new: true }
                    );
                }
            }
        }

        // Send the products as the response
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
}

async function getDealsOfTheMonth(req, res) {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        const deals = await Product.find({
            discountPercent: { $gt: 0 },
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        })
            .sort({ discountPercent: -1 }) // Sort by highest discount
            .limit(4); // Limit to top 10 deals

        res.status(200).json({ success: true, deals });
    } catch (error) {
        console.error('Error fetching deals of the month:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function getNewArrivals(req, res) {
    console.log("from getNewArrivals");
    try {
        // Fetch products created within the last 30 days and sorted by newest first
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const newArrivals = await Product.find({
            createdAt: { $gte: thirtyDaysAgo },
            productType: 'new',
            stock: { $gt: 0 } // Ensure products are in stock
        })
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(10); // Limit to 10 new arrivals

        res.status(200).json({ success: true, newArrivals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
}



module.exports = {
    getAllProducts,
    getProduct,
    removeProduct,
    updateProduct,
    addProduct,
    filterProduct,
    searchProducts,
    getDealsOfTheMonth,
    getNewArrivals
}

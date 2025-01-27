const Product = require('../models/Product');
const UserActivities = require('../models/UserActivities');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary, uploadOnCloudinaryForProducts} = require("../services/cloudinary");
const {getUser, giveUserIdFromCookies} = require("../services/auth");
const fs = require("node:fs");

// Add a new product along with photos
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
        res.status(200).json({success: true, product: product});
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to fetch product', error: error.message});
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, message: 'Product updated successfully', product});
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to update product', error: error.message});
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



module.exports = {
    getAllProducts,
    getProduct,
    removeProduct,
    updateProduct,
    addProduct,
    filterProduct,
    searchProducts,
}

const Product = require('../models/Product');
const UserActivities = require('../models/UserActivities');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary, uploadOnCloudinaryForProducts} = require("../services/cloudinary");
const {getUser, giveUserIdFromCookies} = require("../services/auth");
const fs = require("node:fs");

// Add a new product along with photos
const addProduct = async (req, res) => {
    if (!req.body) {
        return res.json({ success: false, msg: "Please add product details" });
    }
    try {
        const { name, title, description, price, colors } = req.body;

        // Parse the colors array from JSON
        const parsedColors = JSON.parse(colors);

        // Initialize colors array with empty images
        const colorsArray = parsedColors.map((color) => ({
            colorName: color.colorName,
            images: [], // Images will be added after upload
        }));

        // Get user information from the cookies
        const user = getUser(req.cookies.authToken);

        // Create a new product document
        const newProduct = new Product({
            name,
            title,
            description,
            price,
            dealerId: user.id,
            colors: colorsArray,
        });

        // Save the product to get the product ID
        const savedProduct = await newProduct.save();
        const productId = savedProduct._id;

        // Process uploaded files
        const uploadedFiles = req.files;
        if (uploadedFiles && uploadedFiles.length > 0) {
            // Map files to their respective colors
            const cloudinaryResponses = [];
            for (const file of uploadedFiles) {
                const filePath = file.path;

                if (!fs.existsSync(filePath)) {
                    console.error(`File not found: ${filePath}`);
                    continue; // Skip to the next file
                }

                // Extract the colorName from the file field (frontend sends this as the fieldname)
                const colorName = file.fieldname; // Example: "Red"

                // Find the corresponding color object in colorsArray
                const colorObject = colorsArray.find((c) => c.colorName === colorName);

                if (!colorObject) {
                    console.error(`Color ${colorName} not found in colors array.`);
                    continue; // Skip if the color is not defined
                }

                // Upload file to Cloudinary
                const result = await uploadOnCloudinaryForProducts(file.path, {
                    folderPath: `${savedProduct.dealerId}/${productId}/${colorName}`,
                    publicId: `${savedProduct.dealerId}/${productId}/${colorName}/${Date.now()}`,
                });

                if (result) {
                    cloudinaryResponses.push({
                        originalName: file.originalname,
                        cloudinaryUrl: result.url,
                        colorName: colorName,
                    });

                    // Add the Cloudinary URL to the appropriate color's images array
                    colorObject.images.push(result.url);
                }
            }

            // Update the product in the database with uploaded image URLs
            await Product.updateOne({ _id: productId }, { colors: colorsArray });

            // Send success response
            return res.status(200).json({
                message: "Product created and files uploaded to Cloudinary!",
                product: savedProduct,
                uploadedFiles: cloudinaryResponses,
            });
        } else {
            // Handle case where no images are uploaded
            return res.status(200).json({
                success: true,
                message: "New product added successfully without images",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to add product",
            error: err.message,
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

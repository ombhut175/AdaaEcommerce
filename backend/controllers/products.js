const productModel = require('../models/Products');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary, uploadOnCloudinaryForProducts} = require("../services/cloudinary");
const {getUser} = require("../services/auth");
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
        const newProduct = new productModel({
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
            await productModel.updateOne({ _id: productId }, { colors: colorsArray });

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
        const products = await productModel.find();
        res.status(200).json({success: true, products: products});
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to fetch products', error: error.message});
    }
};

// Get a single product by ID
const getProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
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
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
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
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, message: 'Product removed successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to remove product', error: error.message});
    }
};

//filteration of products based on selection

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

        let productsByFilter = await productModel.find(filterData)
        productsByFilter = productsByFilter.filter((product) => product.stock > 0)

        if (productsByFilter.length === 0) {
            return res.json({success: true, msg: "Products not available"})
        }

        return res.json({success: true, msg: "Products available", productsByFilter})

    } catch (err) {
        console.log(":::  filterd error  ::: ", err);
    }

}

async function handleUploadPicturesOfProduct(req, res) {
    try {
        const user = await giveUserFromDb(req.cookies.userId);
        if (!user) {
            return res.status(400).json({message: 'No user found'});
        }

        const uploadedFiles = req.files;

        // Access additional form data
        const {name, title, description, price} = req.body;

        const cloudinaryResponses = [];
        // const user = await giveUserFromDb(req.cookies.userId);
        //
        // for (const file of uploadedFiles) {
        //   const response = await uploadOnCloudinaryForProducts(file.path,{
        //     dealerId
        //   });
        // }


    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({error: 'An error occurred while uploading the file'});
    }
}

async function handleNewProduct(req, res) {
}


module.exports = {
    getAllProducts,
    getProduct,
    removeProduct,
    updateProduct,
    addProduct,
    filterProduct
}

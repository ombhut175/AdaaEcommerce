const productModel = require('../model/Products');
const {giveUserFromDb} = require("../services/common.services");
const {uploadOnCloudinary, uploadOnCloudinaryForProducts} = require("../services/cloudinary");
const {getUser} = require("../services/auth");
const fs = require("node:fs");

// Add a new product
const addProduct = async (req, res) => {
    if (!req.body) {
        return res.json({success: false, msg: "Please add product details"})
    }
    console.log("from addProduct");
    try {
        console.log(req.body);
        const {name, title, description, price} = req.body;
        const user = getUser(req.cookies.authToken);
        console.log(user);

        const newProduct = new productModel({
            name,
            title,
            description,
            price,
            dealerId: user.id,
        });
        const savedProduct = await newProduct.save();
        const productId = savedProduct._id;


        // Step 2: Upload files to local storage and Cloudinary
        const uploadedFiles = req.files;
        if (uploadedFiles && uploadedFiles.length > 0) {
            const cloudinaryResponses = [];

            // Step 3: Upload files to Cloudinary
            for (const file of uploadedFiles) {
                const filePath = file.path;
                console.log("Uploaded files:", uploadedFiles.map(file => file.path));

                if (!fs.existsSync(filePath)) {
                    console.error(`File not found: ${filePath}`);
                    continue; // Skip to the next file
                }

                const result = await uploadOnCloudinaryForProducts(filePath, {
                    folderPath: `${savedProduct.dealerId}/${productId}`,
                    publicId: `${savedProduct.dealerId}${productId}${file.originalname}`,
                });

                if (result) {
                    cloudinaryResponses.push({
                        originalName: file.originalname,
                        cloudinaryUrl: result.url,
                    });
                }
            }


            savedProduct.images.push(...cloudinaryResponses.map(resp => resp.cloudinaryUrl));

            await savedProduct.save();

            // Step 5: Send success response
            return res.status(200).json({
                message: "Product created and files uploaded to Cloudinary!",
                product: savedProduct,
                uploadedFiles: cloudinaryResponses,
            });
        } else {
            return res.status(200).json({success: true, message: "new product added successfully"});
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: 'Failed to add product', error: err.message});
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

        if (productsByFilter.length == 0) {
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

const Product = require('../model/Products'); 

// Add a new product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json({ success:true , message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ success:false ,message: 'Failed to add product', error: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({success:true , products:products});
  } catch (error) {
    res.status(500).json({ success:false , message: 'Failed to fetch products', error: error.message });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({success:false , message: 'Product not found' });
    }
    res.status(200).json({success:true ,product : product});
  } catch (error) {
    res.status(500).json({success:false, message: 'Failed to fetch product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({success:false , message: 'Product not found' });
    }
    res.status(200).json({success:true , message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({success:false , message: 'Failed to update product', error: error.message });
  }
};

// Remove a product by ID
const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success:false,message: 'Product not found' });
    }
    res.status(200).json({success:true , message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({success:false , message: 'Failed to remove product', error: error.message });
  }
};

module.exports={
    getAllProducts,
    getProduct,
    removeProduct,
    updateProduct,
    addProduct
}

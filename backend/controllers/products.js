const productModel = require('../model/Products');

// Add a new product
const addProduct = async (req, res) => {
  if(!req.body){
    return res.json({success:false,msg:"Please add product details"})
  }
  
  try {
    
    const product = new productModel({...req.body , addedAt:Date.now()});
    await product.save();
    return res.status(200).json({ success: true, message: 'Product added successfully', product });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to add product', error: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

// Remove a product by ID
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove product', error: error.message });
  }
};

//filteration of products based on selection

const filterProduct = async (req, res) => {
  const { categoryOfProduct, priceRange, discountRange, size, color, material } = req.body;
  let filterData = {}
  try {
    //category
    if (categoryOfProduct) {
      filterData = { ...filterData, categoryOfProduct: { $eq: categoryOfProduct } }
    }

    //prices
    if (priceRange) {
      const priceArray = priceRange.split("-")
      const max = priceArray[1]
      const min = priceArray[0]
      filterData = { ...filterData, price: { $gte: Number(min), $lte: Number(max) } }
    }

    //discount
    if (discountRange) {
      const discountArray = discountRange.split("-")
      const max = discountArray[1]
      const min = discountArray[0]
      filterData = { ...filterData, discountPercent: { $gte: Number(min), $lte: Number(max) } }
    }

    //size
    if (size) {
      filterData = { ...filterData, size: { $in: size } }
    }

    //color
    if (color) {
      filterData = { ...filterData, color: { $in: color } }
    }

    //material
    if (material) {
      filterData = { ...filterData, material: { $in: material } }
    }

    let productsByFilter = await productModel.find(filterData)
    productsByFilter = productsByFilter.filter((product)=>product.stock>0)
    
    if(productsByFilter.length==0){
      return res.json({success:true,msg:"Products not available"})
    }

    return res.json({success:true,msg:"Products available",productsByFilter})
    
  } catch (err) {
    console.log(":::  filterd error  ::: ", err);
  }

}


module.exports = {
  getAllProducts,
  getProduct,
  removeProduct,
  updateProduct,
  addProduct,
  filterProduct
}

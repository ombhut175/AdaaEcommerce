const Wishlist = require('../models/WishList');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.params.id
    let { productId, color , size } = req.body;
    productId = new mongoose.Types.ObjectId(productId)
    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate color selection
    const colorExists = product.colors.some(c => c.colorName === color);
    if (!colorExists) {
      return res.status(400).json({ message: 'Invalid color selection' });
    }

    // Validate size selection
    if (!product.size.includes(size)) {
      return res.status(400).json({ message: 'Invalid size selection' });
    }

    // Check if item already exists in wishlist
    const existingItem = await Wishlist.findOne({
      user: userId,
      product: productId,
      color,
      size
    });

    if (existingItem) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    // Create new wishlist item
    const wishlistItem = await Wishlist.create({
      user: userId,
      product: productId,
      color,
      size
    });

    const populatedItem = await Wishlist.findById(wishlistItem._id)
      .populate('product', 'name price colors images');

    res.status(201).json(populatedItem);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const id = req.params.id    
    const wishlistItems = await Wishlist.find({ user: id })
      .populate({
        path: 'product',
        select: 'name title price colors images categoryOfProduct brand'
      })
      .sort('-createdAt');

    const formattedItems = wishlistItems.map(item => ({
      _id: item._id,
      product: {
        _id: item.product._id,
        name: item.product.name,
        title: item.product.title,
        price: item.product.price,
        images: item.product.colors.find(c => c.colorName === item.color).images,
        brand: item.product.brand,
        category: item.product.categoryOfProduct
      },
      color: item.color,
      size: item.size,
      createdAt: item.createdAt
    }));

    res.json(formattedItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid wishlist item ID' });
    }

    const item = await Wishlist.findOneAndDelete({
      _id: itemId,
      user: req.user.id
    });

    if (!item) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Item removed from wishlist', id: itemId });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist
};
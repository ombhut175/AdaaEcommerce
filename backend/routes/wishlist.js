const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist
} = require('../controllers/wishlist');

router.post('/:id', addToWishlist);
router.get('/:id', getWishlistItems);
router.delete('/:productId/:userId', removeFromWishlist);

module.exports = router;
const {handleGetCart, handleDeleteProductFromCart, handleUpdateProductQuantity, handleAddProductToCart} = require("../controllers/cart");

const cartRoutes = require('express').Router();

cartRoutes.get('/', handleGetCart);
cartRoutes.delete('/:productId', handleDeleteProductFromCart);
cartRoutes.put('/changeProductQuantity/:productId/:quantity', handleUpdateProductQuantity);
cartRoutes.put('/addProduct/:productId', handleAddProductToCart);

module.exports = cartRoutes;
const Cart = require('../model/Cart');
const {handleGetCart, handleDeleteProductFromCart, handleUpdateProductQuantity} = require("../controllers/cart");

const cartRoutes = require('express').Router();

cartRoutes.get('/', handleGetCart);
cartRoutes.delete('/:productId', handleDeleteProductFromCart);
cartRoutes.put('/changeProductQuantity/:productId/:quantity', handleUpdateProductQuantity);

module.exports = cartRoutes;
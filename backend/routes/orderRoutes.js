const express = require('express');
const {address} = require('../controllers/address')
const {
    getOrdersByStatus,
    getOrdersByUserId,
    createOrder,
    addAllProductsOfCart,
    updateOrder
} = require("../controllers/order");

//declaration
const router = express.Router();


router.get('/', getOrdersByUserId);
router.get('/ordersByStatus', getOrdersByStatus);
router.post('/', createOrder);
router.post('/addAllProductsOfCart', addAllProductsOfCart);
router.put('/updateOrder', updateOrder);


module.exports = router;
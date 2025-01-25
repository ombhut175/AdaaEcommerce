const express = require('express');
const {address} = require('../controllers/address')
const {
    getOrdersByStatus,
    getOrdersByUserId,
    createOrder,
    addAllProductsOfCart,
    updateOrder,
    requestExchange,
    requestReturn
} = require("../controllers/order");

//declaration
const router = express.Router();


router.get('/', getOrdersByUserId);
router.get('/ordersByStatus', getOrdersByStatus);
router.post('/', createOrder);
router.post('/addAllProductsOfCart', addAllProductsOfCart);
router.put('/updateOrder', updateOrder);
router.post('/return', requestReturn);
router.post('/exchange', requestExchange);


module.exports = router;
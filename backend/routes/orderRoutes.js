const express = require('express');
const {address} = require('../controllers/address')
const {
    getOrdersByStatus,
    getOrdersByUserId,
    createOrder,
    addAllProductsOfCart,
    updateOrder,
    requestExchange,
    requestReturn,
    getById,
    delivered,
    cancelled
} = require("../controllers/order");

//declaration
const router = express.Router();


router.get('/', getOrdersByUserId);
router.get('/:id', getById);
router.post('/:id', delivered);
router.post('/cancel/:id',cancelled)
router.get('/ordersByStatus', getOrdersByStatus);
router.post('/', createOrder);
router.post('/addAllProductsOfCart', addAllProductsOfCart);
router.put('/updateOrder', updateOrder);
router.post('/return', requestReturn);
router.post('/exchange', requestExchange);


module.exports = router;
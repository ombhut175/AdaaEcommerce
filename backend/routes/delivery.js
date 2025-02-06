const express = require('express');
const router = express.Router();
const {findDeliveryBoy,markProductDelivered,markProductPickedUpForExchange,markProductPickedUpForReturn} = require('../controllers/delivery');

// Routes
router.get('/delivery/:userId' , findDeliveryBoy)
router.patch('/deliver/:orderId/:productId', markProductDelivered);
router.patch('/pickup-return/:orderId/:productId', markProductPickedUpForReturn);
router.patch('/pickup-exchange/:orderId/:productId', markProductPickedUpForExchange);


module.exports = router;
const express = require('express');
const {checkout,paymentVerification} = require('../controllers/payment')

const router = express.Router();

//routes
router.post('/payment',checkout);
router.post('/paymentVerification',paymentVerification);

module.exports = router
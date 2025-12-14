const express = require('express');
const {trackingProducts} = require('../controllers/tracking')

//declaration
const router = express.Router();

//routes
router.post('/trackingProduct/:id',trackingProducts);

module.exports = router
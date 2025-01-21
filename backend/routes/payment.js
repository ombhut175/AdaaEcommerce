const express = require('express');
const {checkout} = require('../controllers/payment')

const router = express.Router();

//routes
router.post('/payment',checkout);

module.exports = router
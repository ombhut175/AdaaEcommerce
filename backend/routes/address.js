const express = require('express');
const {address} = require('../controllers/address')

//declaration
const router = express.Router();

//routes
router.post('/address',address);

module.exports = router
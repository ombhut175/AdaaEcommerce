const express = require('express');
const {address, checkAddress} = require('../controllers/address')

//declaration
const router = express.Router();

//routes
router.post('/address',address);
router.get('/address/:id',checkAddress);

module.exports = router
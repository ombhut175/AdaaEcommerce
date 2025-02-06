const express = require('express');
const {address, checkAddress, getAllAddress} = require('../controllers/address')

//declaration
const router = express.Router();

//routes
router.get('/address/:id',checkAddress);
router.get('/address',getAllAddress);
router.post('/address',address);

module.exports = router
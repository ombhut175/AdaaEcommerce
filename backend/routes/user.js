const express = require('express');
const {sendOtp,verifyOtp} = require('../controllers/user')

//delclaration 
const router = express.Router();

//routes
router.post('/sendOtp',sendOtp);
router.post('/verifyOtp',verifyOtp);

module.exports = router
const express = require('express');
const {sendOtpToSignup,verifyOtpToSignup,sendOtpForgotPassword,verifyOtpForgotPassword,setNewPassword} = require('../controllers/auth')

//delclaration 
const router = express.Router();

//routes
router.post('/signup/sendOtp',sendOtpToSignup);
router.post('/signup/verifyOtp',verifyOtpToSignup);
router.post('/login/sendOtpForForgot',sendOtpForgotPassword);
router.post('/login/verifyOtpForForgot',verifyOtpForgotPassword);
router.post('/login/setNewPassword',setNewPassword);

module.exports = router
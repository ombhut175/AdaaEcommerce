const express = require('express');
const {forLogin,sendOtpToSignup,verifyOtpToSignup,sendOtpForgotPassword,verifyOtpForgotPassword,setNewPassword} = require('../controllers/auth')

//declaration
const router = express.Router();

//routes 
router.post('/signup/send-otp',sendOtpToSignup);
router.post('/signup/verify-otp',verifyOtpToSignup);
router.post('/login/send-otp-forgot',sendOtpForgotPassword);
router.post('/login/verify-otp-forgot',verifyOtpForgotPassword);
router.post('/login/set-new-password',setNewPassword);
router.post('/login',forLogin);

module.exports = router
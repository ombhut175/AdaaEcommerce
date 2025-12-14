const express = require('express');
const {forLogin,sendOtpToSignup,verifyOtpToSignup,sendOtpForgotPassword,verifyOtpForgotPassword,setNewPassword,
    isUserLoggedIn,
    googleLogin
} = require('../controllers/auth')

//delclaration 
const router = express.Router();

//routes 
router.post('/signup/send-otp',sendOtpToSignup);
router.post('/signup/verify-otp',verifyOtpToSignup);
router.post('/login/send-otp-forgot',sendOtpForgotPassword);
router.post('/login/verify-otp-forgot',verifyOtpForgotPassword);
router.post('/login/set-new-password',setNewPassword);
router.post('/login',forLogin);
router.post('/google-auth',googleLogin);

module.exports = router
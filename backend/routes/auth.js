/**
 * Authentication Routes
 * Handles signup, login, password reset, and Google OAuth
 */

const express = require('express');
const router = express.Router();

const {
    sendOtpToSignup,
    verifyOtpToSignup,
    sendOtpForgotPassword,
    verifyOtpForgotPassword,
    setNewPassword,
    forLogin,
    isUserLoggedIn,
    googleLogin
} = require('../controllers/auth');

// Signup Routes
router.post('/signup/send-otp', sendOtpToSignup);
router.post('/signup/verify-otp', verifyOtpToSignup);

// Login Routes
router.post('/login', forLogin);
router.get('/check-auth', isUserLoggedIn);

// Google OAuth
router.post('/google-auth', googleLogin);

// Password Reset Routes
router.post('/login/send-otp-forgot', sendOtpForgotPassword);
router.post('/login/verify-otp-forgot', verifyOtpForgotPassword);
router.post('/login/set-new-password', setNewPassword);

module.exports = router;
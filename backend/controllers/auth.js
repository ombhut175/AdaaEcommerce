/**
 * Authentication Controller
 * Handles user signup, login, password reset, and Google OAuth
 */

const bcrypt = require('bcrypt');
const User = require('../model/User');
const TempUser = require('../model/tempUserModel');
const { sendOtpViaEmail } = require('../services/mailServices');
const { setUser, setUserCookies, giveUserIdFromCookies, googleAuth } = require('../services/auth');

// Constants
const OTP_EXPIRY_MINUTES = 10;
const SALT_ROUNDS = 10;

/**
 * Generate a 6-digit OTP
 */
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * Get OTP expiry date
 */
const getOTPExpiry = () => new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

// ==========================================
// SIGNUP METHODS
// ==========================================

/**
 * Send OTP for signup
 */
const sendOtpToSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'User already exists' });
        }

        // Check if OTP already sent
        const tempUser = await TempUser.findOne({ email });
        if (tempUser) {
            return res.status(400).json({ success: false, msg: 'OTP already sent. Please verify.' });
        }

        // Hash password and create temp user
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const otp = generateOTP();

        await TempUser.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt: getOTPExpiry()
        });

        // Send OTP
        await sendOtpViaEmail(email, otp);

        return res.status(200).json({ success: true, msg: 'OTP sent successfully' });
    } catch (err) {
        console.error('sendOtpToSignup error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

/**
 * Verify OTP and complete signup
 */
const verifyOtpToSignup = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const tempUser = await TempUser.findOne({ email });

        if (!tempUser) {
            return res.status(404).json({ success: false, msg: 'User not found or OTP expired' });
        }

        if (tempUser.otp !== otp) {
            return res.status(400).json({ success: false, msg: 'Invalid OTP' });
        }

        if (tempUser.otpExpiresAt < Date.now()) {
            await TempUser.deleteOne({ email });
            return res.status(400).json({ success: false, msg: 'OTP has expired' });
        }

        // Create user
        const newUser = await User.create({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password,
            verified: true
        });

        // Cleanup temp user
        await TempUser.deleteOne({ email });

        // Generate token and set cookie
        const token = setUser(newUser);
        setUserCookies(res, token);

        return res.status(200).json({ success: true, msg: 'User verified successfully', token });
    } catch (err) {
        console.error('verifyOtpToSignup error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// ==========================================
// LOGIN METHODS
// ==========================================

/**
 * Login with email and password
 */
const forLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, msg: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, msg: 'Password incorrect' });
        }

        const token = setUser(user);
        setUserCookies(res, token);

        return res.status(200).json({
            success: true,
            msg: 'Login successful',
            token,
            profilePicture: user.profilePicture
        });
    } catch (err) {
        console.error('forLogin error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

/**
 * Google OAuth login
 */
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, msg: 'Token is required' });
        }

        const { user, authToken } = await googleAuth(token);
        setUserCookies(res, authToken);

        return res.status(200).json({
            success: true,
            msg: 'Login successful',
            token: authToken,
            user
        });
    } catch (error) {
        console.error('googleLogin error:', error);
        return res.status(401).json({
            success: false,
            msg: 'Google authentication failed',
            details: error.message
        });
    }
};

/**
 * Check if user is logged in
 */
const isUserLoggedIn = async (req, res) => {
    try {
        const userId = giveUserIdFromCookies(req.cookies.userId);

        if (!userId) {
            return res.status(401).json({ success: false, msg: 'User not logged in' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not found' });
        }

        return res.status(200).json({ success: true, msg: 'User is logged in' });
    } catch (error) {
        console.error('isUserLoggedIn error:', error);
        return res.status(401).json({ success: false, msg: 'User not logged in' });
    }
};

// ==========================================
// PASSWORD RESET METHODS
// ==========================================

/**
 * Send OTP for forgot password
 */
const sendOtpForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: "User doesn't exist" });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = getOTPExpiry();
        await user.save();

        await sendOtpViaEmail(email, otp);

        return res.status(200).json({ success: true, msg: 'OTP sent successfully' });
    } catch (err) {
        console.error('sendOtpForgotPassword error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

/**
 * Verify OTP for forgot password
 */
const verifyOtpForgotPassword = async (req, res) => {
    const { otp, email } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ success: false, msg: 'Email and OTP are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, msg: 'Invalid OTP' });
        }

        if (user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, msg: 'OTP has expired' });
        }

        const token = setUser(user);
        setUserCookies(res, token);

        return res.status(200).json({ success: true, msg: 'OTP verified successfully', token });
    } catch (err) {
        console.error('verifyOtpForgotPassword error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

/**
 * Set new password
 */
const setNewPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ success: false, msg: 'Email and new password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await user.save();

        return res.status(200).json({ success: true, msg: 'Password changed successfully' });
    } catch (err) {
        console.error('setNewPassword error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

module.exports = {
    sendOtpToSignup,
    verifyOtpToSignup,
    sendOtpForgotPassword,
    verifyOtpForgotPassword,
    setNewPassword,
    forLogin,
    isUserLoggedIn,
    googleLogin
};
/**
 * Authentication Service
 * Handles JWT tokens, cookies, and Firebase authentication
 */

require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const User = require('../model/User');

/**
 * Authenticate user with Firebase Google token
 * @param {string} token - Firebase ID token from frontend
 * @returns {Promise<{user: Object, authToken: string}>}
 */
async function googleAuth(token) {
    const decodedToken = await admin.auth().verifyIdToken(token);

    let user = await userModel.findOne({ email: decodedToken.email });

    if (!user) {
        user = await userModel.create({
            name: decodedToken.name || 'Google User',
            email: decodedToken.email,
            password: decodedToken.sub, // Using Firebase uid as password placeholder
            profilePicture: decodedToken.picture || '',
            verified: true,
            userType: 'google'
        });
    }

    const authToken = setUser(user);
    return { user, authToken };
}

/**
 * Create JWT token for user
 * @param {Object} user - User document from database
 * @returns {string} JWT token
 */
function setUser(user) {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token payload or null
 */
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log('Token verification failed:', err.message);
        return null;
    }
}

/**
 * Extract user ID from cookie token
 * @param {string} token - JWT token from cookie
 * @returns {string|null} User ID or null
 */
function giveUserIdFromCookies(token) {
    const user = getUser(token);
    if (!user) return null;
    return user.id;
}

/**
 * Set authentication cookie
 * @param {Object} res - Express response object
 * @param {string} token - JWT token
 */
function setUserCookies(res, token) {
    try {
        return res.cookie('userId', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

/**
 * Remove authentication cookie
 * @param {Object} res - Express response object
 * @param {string} cookieName - Name of cookie to remove
 */
function removeUserCookies(res, cookieName) {
    res.clearCookie(cookieName);
}

module.exports = {
    setUser,
    getUser,
    giveUserIdFromCookies,
    setUserCookies,
    removeUserCookies,
    googleAuth,
};
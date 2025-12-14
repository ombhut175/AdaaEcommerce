/**
 * Google Authentication Routes
 * Uses Firebase Admin SDK for token verification
 */

const express = require('express');
const googleRoutes = express.Router();
const { googleLogin } = require('../controllers/auth');
const { removeUserCookies } = require('../services/auth');

/**
 * POST /api/google-auth
 * Verify Firebase ID token and authenticate user
 */
googleRoutes.post('/google-auth', googleLogin);

/**
 * GET /api/google/logout
 * Clear user session and cookies
 */
googleRoutes.get('/logout', (req, res) => {
    try {
        removeUserCookies(res, 'userId');
        return res.status(200).json({
            success: true,
            msg: 'Logged out successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Logout failed'
        });
    }
});

module.exports = googleRoutes;
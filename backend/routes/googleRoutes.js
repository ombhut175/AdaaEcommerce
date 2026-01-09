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
<<<<<<< HEAD
=======
    return res.status(200).json({
        error:false,
        message:'Successfully logged in',
        user:req.user
    })
})

googleRoutes.get('/user',(req,res)=>{
    if (!req.user){
        return res.status(401).json({error:'Not authenticated'})
    }
    return res.status(200).send(req.user);
})


googleRoutes.get('/login/failed',(req,res)=>{
    return res.status(400).json({
        error:true,
        message:'Log in Failure'
    })
})

googleRoutes.get('/callback', passport.authenticate('google', {
    failureRedirect: '/api/google/login/failed'
}),(req,res)=>{
    const {user} = req;
    const token = setUser(user);
    setUserCookies(res ,token);
    return res.redirect(`${process.env.CLIENT_URL}`);
>>>>>>> origin
});

module.exports = googleRoutes;
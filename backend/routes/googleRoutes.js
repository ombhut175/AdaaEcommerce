require('dotenv').config({path:'../.env'});
const googleRoutes = require('express').Router();
const passport = require('passport');
const {setUser, setUserCookies, removeUserCookies} = require("../services/auth");



// Google login route
googleRoutes.get('/', passport.authenticate("google", {
    scope: ["profile", "email"]
}));


googleRoutes.get('/login/success',(req,res)=>{
    if (!req.user){
        return res.status(400).json({error:true,message:'Not Authorized'});
    }
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
});

googleRoutes.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if (err){
            removeUserCookies(res ,'userId');
            return next(err);
        }
        return res.redirect(process.env.CLIENT_URL);
    });
})


module.exports = googleRoutes;
require('dotenv').config({path:'../.env'});
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../model/User');
const {handleCreateNewCart} = require("../controllers/cart");


passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.BACKEND_URL
    },
    async function(accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({googleId: profile.id});
            if (!user){
                user = await User.create({
                    googleId:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    profilePicture:profile.photos[0].value,
                    userType:'google'
                });
                await handleCreateNewCart(user._id);
            }
            return cb(null,user);
        }catch (error){
            return cb(error,null);
        }
    }
));


passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})


module.exports=passport;
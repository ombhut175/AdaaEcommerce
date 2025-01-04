require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');
const res = require("express/lib/response");

function setUser(user) {
    return jwt.sign({
        id: user._id,
        email: user.email,
    },process.env.JWT_SECRET,{expiresIn:'30d'});
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token,process.env.SECRETKEY);
    } catch (err) {
        console.log(err);
        
    }
}

function giveUserIdFromCookies(token) {
    const user = getUser(token);
    if (!user) return null;
    return user.id;
}

function setUserCookies(res,token) {
    try {
        return res.cookie('userId', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None', // For cross-origin cookie sharing
            maxAge: 7 * 24 * 60 * 60 * 1000  //expires after 1 week
        })
    } catch (error) {
        console.log(error);
    }
}

function removeUserCookies(res ,cookieName) {
    res.clearCookie(cookieName);
}

module.exports = {
    setUser,
    getUser,
    giveUserIdFromCookies,
    setUserCookies,
    removeUserCookies,
}
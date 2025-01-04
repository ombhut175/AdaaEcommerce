require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');


function setUser(user){

    return jwt.sign({
        id: user._id,
        email: user.email,
    },process.env.JWT_SECRET);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,process.env.SECRETKEY);
    } catch (error) {
    }
}

function giveUserIdFromCookies(token){
    const user = getUser(token);
    if(!user) return null;
    return user.id;
}

module.exports = {
    setUser,
    getUser,
    giveUserIdFromCookies
}
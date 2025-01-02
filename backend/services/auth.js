require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');


function setUser(user){

    return jwt.sign({
        name: user.name,
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



module.exports = {
    setUser,
    getUser
}
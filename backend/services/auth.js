require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');


function setUser(user){

    return jwt.sign({
        name: user.name,
        email: user.email,
    },process.env.JWT_SECRET,{expiresIn:'30d'});
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,process.env.SECRETKEY);
    } catch (err) {
        console.log(err);
        
    }
}



module.exports = {
    setUser,
    getUser
}
const User = require('../model/User');
const {getUser} = require("./auth");

async function giveUserFromDb(token){
    try {
        const user = getUser(token);
        return await User.findById(user.id);
    }catch (error){
        console.log(error);
    }
}

module.exports = {
    giveUserFromDb
}
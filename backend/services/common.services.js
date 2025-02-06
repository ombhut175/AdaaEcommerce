const User = require('../models/User');
const {getUser} = require("./auth");

async function giveUserFromDb(token) {
    try {
        if (!token) {
            return Promise.reject(new Error("No Token provided"));
        }
        const user = getUser(token);
        if (!user) {
            return Promise.reject(new Error("User not found"));
        }
        return await User.findById(user.id);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    giveUserFromDb
}
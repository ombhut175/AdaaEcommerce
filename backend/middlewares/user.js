const {giveUserFromDb} = require("../services/common.services");

async function checkForUserAuthentication(req, res, next) {
    try {
        console.log("from checkForUserAuthentication");
        console.log(req.cookies.authToken);
        const user = await giveUserFromDb(req.cookies.authToken);
        if (!user.role.includes("customer")) {
            return res.status(401).json({message:'Authentication Failed'});
        }
        return next();
    }catch(err) {
        console.log(err);
        res.status(400).json({message:'Authentication Failed'});
    }
}

module.exports = {
    checkForUserAuthentication,
}
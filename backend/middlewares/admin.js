const {giveUserFromDb} = require("../services/common.services");

async function checkForAdminAuthentication(req, res, next) {
    try {
        const user = await giveUserFromDb(req.cookies.authToken);
        console.log(user)
        if (!user.role.includes("admin")) {
            return res.status(403).send("Not authorized to authenticate");
        }
        return next();
    }catch (error) {
        console.log(error);
        return res.status(403).send("Not authorized to authenticate");
    }
}

module.exports = {checkForAdminAuthentication};
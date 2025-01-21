const {giveUserFromDb} = "../services/common.services";

async function checkForDealerAuthentication(req, res , next) {
    try {
        const user = await giveUserFromDb(req.cookies.authToken);

        if (!user.role.includes("admin")) {
            return res.status(403).send("Not authorized to authenticate");
        }
        return next();
    }catch (error) {
        return res.status(400).send("Error in Server");
    }
}

module.exports = {checkForDealerAuthentication};
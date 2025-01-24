const {giveUserFromDb} = "../services/common.services";

async function validateLogin(req, res, next) {
    try {
        const user = await giveUserFromDb(req.cookies.authToken);
        if (!user) {
            return res.status(401).send("User not found");
        }
        return next();
    }catch(error) {
        console.log(error);
        return res.status(400).send("Error in Server");
    }
}

module.exports = {validateLogin};
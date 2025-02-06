import {giveUserFromDb} from "../services/common.services";

async function checkForAuthenticationForDeliveryBoy(req, res, next) {
    try {
        const user = await giveUserFromDb(req.cookies.authToken);
        if (!user.role.includes("Delivery Boy")) {
            return res.status(403).send("Not authorized");
        }
        return next();
    }catch (error){
        console.log(error)
        return res.status(403).send("Not authorized to authenticate");
    }
}


module.exports = {checkForAuthenticationForDeliveryBoy};
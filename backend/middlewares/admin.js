const {giveUserFromDb} = require("../services/common.services");
/**
 * Middleware function to check if the user is authenticated as an admin.
 *
 * Retrieves the user from the database using the authToken from cookies.
 * If the user does not have an admin role, responds with a 403 status and an error message.
 * If an error occurs during the process, logs the error and responds with a 403 status.
 * Calls the next middleware function if the user is authenticated as an admin.
 *
 * @param {Object} req - The request object, containing cookies with authToken.
 * @param {Object} res - The response object, used to send a response if not authorized.
 * @param {Function} next - The next middleware function in the stack.
 */
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
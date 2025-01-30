const Product = require("../models/Product");
const {giveUserIdFromCookies} = require("../services/auth");

async function giveProducts(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        if (!userId) {
            return res.status(404).json({ error: "User not found" });
        }
        const products = await Product.find({dealerId: userId});
        return res.status(200).json(products);
    }catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
}

async function editProduct(req, res) {

}

module.exports = {
    giveProducts,
};
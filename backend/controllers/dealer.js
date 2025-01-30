const Product = require("../models/Product");
const {giveUserIdFromCookies} = require("../services/auth");
const {ObjectId} = require('mongoose').Types;


async function giveProducts(req, res) {
    try {
        console.log("from giveProducts");
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        console.log(userId);
        if (!userId) {
            return res.status(404).json({ error: "User not found" });
        }
        const products = await Product.find({dealerId: new ObjectId(userId)});
        console.log(products);
        return res.status(200).json(products);
    }catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
}

async function editProduct(req, res) {
    try {

    }catch (e) {
        console.log(e);
    }
}

module.exports = {
    giveProducts,
};
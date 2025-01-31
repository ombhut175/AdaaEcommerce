const Product = require("../models/Product");
const {giveUserIdFromCookies, getUser} = require("../services/auth");
const {uploadOnCloudinaryForProducts} = require("../services/cloudinary");
const fs = require("node:fs");

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





module.exports = {
    giveProducts,
};
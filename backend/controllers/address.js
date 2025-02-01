const addressModel = require('../models/Address')
const z = require('zod');
const {giveUserIdFromCookies} = require("../services/auth");
const {ObjectId} = require('mongoose').Types;

const addressSchemaForValidation = z.object({
    flat: z.string().nonempty().max(30),
    area: z.string().nonempty().max(100),
    pincode: z.number(),
    state: z.string().nonempty()
})

async function address(req, res) {
    console.log(req.body);
    
    const { 
        firstName,
        lastName,
        addressLine,
        postalCode, 
        state, 
        country,
        city,
        } = req.body;


    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);

        const data = await addressModel.create({
            fullName:firstName + ' ' + lastName,
            address:addressLine,
            pincode:postalCode,
            state,
            country,
            city,
            userId:new ObjectId(userId)
        })
        if (!data) {
            res.status(500).json({ success: false, msg: "Insertion error in address" });
        }
        res.status(200).json({ success: true, msg: "Address saved successful" ,addressId: data._id});
    } catch (err) {
        console.log("Insertion in address error :", err);
    }
}

module.exports = {
    address,
}
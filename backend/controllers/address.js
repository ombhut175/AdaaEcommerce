const addressModel = require('../models/Address')
const z = require('zod');

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
        userId } = req.body;

    try {

        const data = await addressModel.create({
            fullName:firstName + ' ' + lastName,
            address:addressLine,
            pincode:postalCode,
            state,
            country,
            city,
            userId:userId
        })
        if (!data) {
            res.status(500).json({ success: false, msg: "Insertion error in address" });
        }
        res.status(200).json({ success: true, msg: "Address saved successful" });
    } catch (err) {
        console.log("Insertion in address error :", err);
    }
}

module.exports = {
    address,
}
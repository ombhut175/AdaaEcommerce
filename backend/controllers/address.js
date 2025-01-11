const addressModel = require('../model/Address')
const z = require('zod');

const addressSchemaForValidation = z.object({
    flat: z.string().nonempty().max(30),
    area: z.string().nonempty().max(100),
    pincode: z.number(),
    state: z.string().nonempty()
})

async function address(req, res) {
    const { flat, area, pincode, state } = req.body;
    const response = addressSchemaForValidation.safeParse({ flat, area, pincode, state });
    try {
        if (!response.success) {
            res.json(response);
        }

        const data = await addressModel.create({
            flat,
            area,
            pincode,
            state
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
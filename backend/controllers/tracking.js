const trackingModel = require("../models/Tracking")
const productModel = require("../models/Product")
const userModel = require("../models/User")
const addressModel = require('../models/Address')
const trackingProducts = async(req,res)=>{
    const {deliveryBoyId,
        trackingStatus,
        currentLocation,
        estimatedDelivery,
        destinationAddressId
    } = req.body;
    try
    {
        const productData = await productModel.find({_id:req.params.id})
        const deliveryBoyData = await userModel.find({_id:deliveryBoyId})
        const addressData = await addressModel.find({_id:destinationAddressId})
        res.json({productData,deliveryBoyData,addressData});
    }catch(err){
        console.log(err);
        
    }

}

module.exports = {
    trackingProducts
}

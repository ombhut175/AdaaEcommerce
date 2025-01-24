const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    productId:{
        type:String,
        ref:'products',
        required:true
    },
    deliveryPersonId :{
        type:String,
        ref:'users',
        required:true
    },
    trackingStatus:{
        type:String,
        required:true
    },
    currentLocation:{
        type:String,
        required:true
    },
    destinationAddress:{
        type:String,
        ref:'addresses',
        required:true
    },
    estimatedDelivery:{
        type:Date,
        required:true
    },
    lastUpdate:{
        type:Date,
        default:Date.now
    }

});

const trackingModel = mongoose.model('Tracking', trackingSchema);

module.exports = trackingModel;

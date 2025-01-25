const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    productId:{
        type:String,
        ref:'Product',
        required:true
    },
    deliveryPersonId :{
        type:String,
        ref:'User',
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
        ref:'Address',
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

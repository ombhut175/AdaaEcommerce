const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        },
        price:{
            type: Number,
        },
        discount: {
            type: Number,
        },
        addressId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'addresses',
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        paymentMethod : {
            type: "string",
        },
        paymentStatus : {
            type: "string",
        },
        orderStatus: {
            type: "string",
            default: "success",
        },
        orderDate:{
            type : Date,
            default: Date.now,
        },
        deliveryDate:{
            type : Date,
        }
    }]
})

module.exports = mongoose.model('Order', ordersSchema);
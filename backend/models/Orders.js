const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    orderType: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: "string",
    },
    paymentStatus: {
        type: "string",
    },
    orderStatus: {
        type: "string",
        default: "success",
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
    },
    deliveryBoyId: {
        type:mongoose.Schema.Types.ObjectId
    }
}, {timestamps: true});


module.exports = mongoose.model('Orders', ordersSchema);
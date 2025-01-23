const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        dealerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
        name: {type: String, required: true},
        title: {type: String, required: true},
        description: {type: String},
        brand: {type: String},
        price: {type: Number, required: true},
        categoryOfProduct: {type: String},
        size: [String],
        color: String,
        material: String,
        discountPercent: {type: Number},
        stock: {type: Number, default: 0},
        reviews: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number,
                min: 0,
                max: 5,
            },
            comment: {
                type: String,
                trim: true, // Remove unnecessary whitespace
            },
            createdAt: {
                type: Date,
                default: Date.now, // Timestamp for each review
            },
        },
        images: [String],
        features: [String],
        offers: {
            bankOffers: String,
            partnersOffers: String
        },
        warrantyDetails: String,
        addedAt: Date,
        updatedAt: Date,


    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);

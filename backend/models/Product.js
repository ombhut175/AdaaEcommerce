const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        dealerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        name: {type: String, required: true},
        title: {type: String, required: true},
        description: {type: String},
        brand: {type: String},
        price: {type: Number, required: true},
        categoryOfProduct: {type: String},
        gender: {type: String},
        size: [String],
        colors: [
            {
                colorName: {type: String, required: true}, // e.g., "Red", "Blue"
                images: {type: [String], required: true}, // Array of image URLs specific to this color
            },
        ],
        material: String,
        discountPercent: {type: Number},
        productType: {
            type: String,
            default: 'new',
        },
        stock: {type: Number, default: 0},
        reviews: [
            {
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
                    trim: true,
                },
                sales: { type: Number, default: 0 },
                createdAt: {
                    type: Date,
                    default: Date.now, // Timestamp for each review
                },
            },
        ],
        features: [String],
        offers: {
            bankOffers: String,
            partnersOffers: String,
        },
        warrantyDetails: String,
    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);

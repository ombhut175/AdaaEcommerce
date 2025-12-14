const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        dealerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        brand: { type: String },
        price: { type: Number, required: true },
        categoryOfProduct: { type: String },
        gender: { type: String },
        // Define size as an array of strings with enum validation for each element.
        size: [
            {
                type: String,
                enum: [
                    "XXS",
                    "XS",
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL",
                    "XXXL",
                    "4XL",
                    "5XL",
                    "6XL"
                ]
            }
        ],
        colors: [
            {
                colorName: { type: String, required: true }, // e.g., "Red", "Blue"
                images: { type: [String], required: true }, // Array of image URLs specific to this color
            },
        ],
        material: String,
        discountPercent: { type: Number },
        productType: {
            type: String,
            default: 'new',
        },
        stock: { type: Number, default: 0 },
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
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

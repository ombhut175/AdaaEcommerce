const mongoose = require("mongoose");

// Define schema for user activities
const userActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Unique user ID (use MongoDB's ObjectId)
        required: true
    },
    searchedProducts: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true}, // Reference to the product
            searchTimestamp: {type: Date, default: Date.now} // Timestamp of search
        }
    ],
    viewedProducts: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true}, // Reference to the product
            viewTimestamp: {type: Date, default: Date.now} // Timestamp of view
        }
    ],
    purchasedProducts: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true}, // Reference to the product
            purchaseTimestamp: {type: Date, default: Date.now}, // Timestamp of purchase
            quantity: {type: Number, default: 1, min: 1} // Quantity purchased
        }
    ],
    wishlist: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true}, // Reference to the product
            addedTimestamp: {type: Date, default: Date.now} // Timestamp of addition
        }
    ],
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    }
}, {timestamps: true});

// Create and export the UserActivity model
const UserActivity = mongoose.model("UserActivity", userActivitySchema);

module.exports = UserActivity;

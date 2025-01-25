const mongoose = require("mongoose");

// Define schema for user activities
const userActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Unique user ID (use MongoDB's ObjectId)
        ref: 'User',
        required: true
    },
    searchedProducts: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true}, // Reference to the product
            searchTimestamp: {type: Date, default: Date.now} // Timestamp of search
        }
    ],
    viewedProducts: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true}, // Reference to the product
            viewTimestamp: {type: Date, default: Date.now} // Timestamp of view
        }
    ],
    purchasedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchasedProduct',
    }],
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    }
}, {timestamps: true});

// Create and export the UserActivity model
const UserActivity = mongoose.model("UserActivities", userActivitySchema);

module.exports = UserActivity;

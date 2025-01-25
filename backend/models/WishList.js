const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user who owns this wishlist
        required: true,
        unique: true // Ensure one wishlist per user
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true
    }, // Reference to the product
    addedTimestamp: {type: Date, default: Date.now} // Timestamp when the product was added to the wishlist

}, {timestamps: true});

// Create and export the Wishlist model
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;

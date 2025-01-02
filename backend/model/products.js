const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    brand: { type: String },
    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
    price: { type: Number, required: true },
    discountPercent: { type: Number },
    stock: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 0, max: 5 },
        comment: { type: String },
      },
    ],
    ratings: {
      averageRating: { type: Number, min: 0, max: 5, default: 0 },
      reviewCount: { type: Number, default: 0 },
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    flat: { type: String, required: true },
    area: { type: String, required: true },
    pincode: { type: Number, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Address', addressSchema);

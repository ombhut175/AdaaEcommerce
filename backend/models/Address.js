const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        fullName: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        pincode: {type: Number, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        latitude: Number,
  longitude: Number,
    },
    {timestamps: true}
);

module.exports = mongoose.model('Address', addressSchema);

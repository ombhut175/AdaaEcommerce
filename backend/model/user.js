const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true }, 
    profilePicture: { type: String }, 
    otp: { type: String },
    role: { type: [String], default: [] }, 
    status: { type: String, default: 'active' }, 
    devices: { type: [String], default: [] },
    membership: { type: String },
    otpExpiresAt: { type: Date },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('User', userSchema);

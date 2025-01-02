const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true}, 
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

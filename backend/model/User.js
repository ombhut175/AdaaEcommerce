const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String},
        profilePicture: {type: String , default: "https://res-console.cloudinary.com/dvyz3pp5z/thumbnails/v1/image/upload/v1735991146/ZGVmYXVsdC1wcm9maWxlLWFjY291bnRfaGF3eXhu/"},
        otp: {type: String},
        role: {type: [String], default: ["customer"]},
        status: {type: String, default: 'active'},
        devices: {type: [String], default: []},
        googleId: {type: String},
        membership: {type: String},
        otpExpiresAt: {type: Date},
        userType: {type: String},
        verified: {type: Boolean, default: false},
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);

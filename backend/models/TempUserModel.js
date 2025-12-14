const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpiresAt: { type: Date, required: true, index: { expires: '10m' } }, // Deletes after 10 minutes
});

const tempUserModel = mongoose.model('TempUser', tempUserSchema);

module.exports = tempUserModel;

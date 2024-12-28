const { timeStamp } = require('console')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    mobile:String,
    otp: { type: String },
    otpExpiresAt: { type: Date },
    verified: { type: Boolean, default: false },
},{timeStamp:true})


module.exports = mongoose.model('User', userSchema);
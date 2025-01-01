const { timeStamp } = require('console')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    mobile:String,
    password:String,
    profilePicture:String,
    otp: { type: String },
    role:[],
    status:String,
    devices:[],
    membership:String,
    otpExpiresAt: { type: Date },
    verified: { type: Boolean, default: false },
},{timeStamp:true})


module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    userId:String,
    flat:String,
    area:String,
    pincode:Number,
    state:String   
},{timeStamp:true})


module.exports = mongoose.model('Address', addressSchema);
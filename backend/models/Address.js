const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    userId: { type: String, ref: 'User', required: true },
    fullName:{ type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true },
    state: { type: String, required: true },
    country:{type:String,required:true}
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Address', addressSchema);

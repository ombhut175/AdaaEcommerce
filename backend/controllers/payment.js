const Razorpay = require('razorpay')
const crypto = require('crypto');
const instance = new Razorpay({ key_id: process.env.RAZOR_API_KEY, key_secret: process.env.RAZOR_API_SECRET })
const Payment = require('../model/Payment')

const checkout = async (req,res)=>{
    options = {
        amount: req.body.amount,  
        currency: "INR"
      };
      const order = await instance.orders.create(options);

      res.status(200).json({
        success: true,
        order,
      });
}
const paymentVerification =  async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    
    await payment.save();
    

    return res.redirect(process.env.CLIENT_URL)
  } else {
    res.status(400).json({
      success: false,
      msg:"failed payment verification"
    });
  }
};

module.exports = {
    checkout,
    paymentVerification
}
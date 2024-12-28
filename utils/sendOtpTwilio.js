// utils/sendOtp.js
const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendOtpTwilio(mobile, otp) {
  try {
    await client.messages.create({
      body: `Tp SignUp / SignIn Your account OTP is ${otp} (valid for 10 mins). 
            Do not share any one for security reasons.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile,
    });
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
}

module.exports = sendOtpTwilio;

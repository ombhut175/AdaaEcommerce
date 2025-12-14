const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_OF_DEVELOPER,
    pass: "kcfleaovoepfkipb",
  },
});

const sendOtpViaEmail = async (email,otp)=>{
    const info = await transporter.sendMail({
        from: process.env.EMAIL_OF_DEVELOPER, // sender address
        to: email, // list of receivers
        subject: `Adaa-Jaipur`, // Subject line
        text: `Your OTP is ${otp}`, // plain text body
        // html: "<b>Hello world?</b>", // html body
      }); 
}


module.exports = {
    sendOtpViaEmail,
}
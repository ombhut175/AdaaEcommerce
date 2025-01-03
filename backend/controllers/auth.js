const userModel = require('../model/user')
const z = require('zod');
const {sendOtpViaEmail} = require('../utils/MailServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

//signupSendOtp method -----------------------------------------------------
const sendOtpToSignup = async (req, res) => {
    let {name, email, password} = req.body;

    //generate otp & expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    try {

        //userModel exists or not
        const User = await userModel.findOne({email});

        if (User) {

            res.send(400).json({success: false, msg: "User Already Exists"})

        } else {
            password = await bcrypt.hash(password,5);
            //create new userModel
            await userModel.create({
                name,
                email,
                otp,
                password,
                otpExpiresAt,
                userType: 'otp'
            })
        }

        //send otp
        await sendOtpViaEmail(email, otp)

        res.status(200).json({success: true, msg: "Otp send successful !"})

    } catch (err) {

        console.log(`Error occured in send otp  : ${err}`);

    }
}

const verifyOtpToSignup = async (req, res) => {
    const {otp, email} = req.body;

    //check is empty or not
    if (!otp || !email) {
        res.status(400).json({success: false, msg: "All fields are required Email and OTP !"});
    }

    try {
        //find userModel
        const User = await userModel.findOne({email});

        //check is invalid or expiration
        if (User.otp !== otp) {
            res.json({success: false, msg: "Otp is invalid"})
        }

        if (User.otpExpiresAt < Date.now()) {
            res.json({success: false, msg: "Otp is Expires"})
        }

        await User.save();

        //sign a jwt token
        const token = jwt.sign({id: User._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('auth-token', token);
        res.status(200).json({message: 'User verified successfully', token});

    } catch (err) {

        console.log(`Error occur in verify otp : ${err}`);

    }
}

//forgot password during the login 
const sendOtpForgotPassword = async (req, res) => {
    const {email} = req.body;

    //generate otp & expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    try {

        //userModel exists or not
        const User = await userModel.findOne({email});
        User.otp = otp,
            User.otpExpiresAt = otpExpiresAt

        //save otp to database
        await User.save();

        //send otp
        await sendOtpViaEmail(email, otp)

        res.status(200).json({success: true, msg: "Otp send successful !"})

    } catch (err) {

        console.log(`Error occured in send otp  : ${err}`);

    }
}

const verifyOtpForgotPassword = async (req, res) => {
    const {otp, email} = req.body;

    //check is empty or not
    if (!otp || !email) {
        res.status(400).json({success: false, msg: "All fields are required Email and OTP !"});
    }

    try {
        //find userModel
        const User = await userModel.findOne({email});

        //check is invalid or expiration
        if (User.otp !== otp) {
            res.json({success: false, msg: "Otp is invalid"})
        }

        if (User.otpExpiresAt < Date.now()) {
            res.json({success: false, msg: "Otp is Expires"})
        }

        //sign a jwt token
        const token = jwt.sign({id: User._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.cookie('auth-token', token);
        res.status(200).json({message: 'User verified successfully', token});

    } catch (err) {

        console.log(`Error occur in verify otp : ${err}`);

    }
}

const setNewPassword = async (req, res) => {
    const {email, newPassword} = req.body;

    //check is empty or not
    if (!email) {
        res.status(400).json({success: false, msg: "All fields are required Email !"});
    }

    try {
        //find userModel
        const User = await userModel.findOne({email});

        //check is invalid or expiration
        User.password = await bcrypt.hash(newPassword,5);
        await User.save();

        res.status(200).json({success: true, message: 'Password changed successfully'});

    } catch (err) {

        console.log(`Error occur in verify otp : ${err}`);

    }
}

const forLogin = async (req, res) => {
    const {email, password} = req.body;
    try{
    if (!email && !password) {
        return res.status(404).json({success: false, msg: "All feild are required !"});
    }

    const data = await userModel.findOne({email});
    if (!data) {
        res.status(404).json({success: false, msg: "User Not found"});
    }
    const isPassValid = await bcrypt.compare(password,data.password)
    if (isPassValid) {
        const token = jwt.sign({id: data._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.cookie('auth-token', token);

        res.json({
            success: true, msg: "Login Successful"
        })
    }
    res.json({success: false, msg: "Password Incorrect"})
    }catch(err){
        console.log(err);
        
    }
}
module.exports = {
    sendOtpToSignup,
    verifyOtpToSignup,
    sendOtpForgotPassword,
    verifyOtpForgotPassword,
    setNewPassword,
    forLogin
}
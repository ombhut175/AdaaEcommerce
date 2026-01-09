<<<<<<< HEAD
/**
 * Authentication Controller
 * Handles user signup, login, password reset, and Google OAuth
 */
=======
const userModel = require('../models/User')
const {sendOtpViaEmail} = require('../services/mailServices');
const bcrypt = require('bcrypt');
const tempUserModel = require('../models/TempUserModel');
const {setUser, setUserCookies, giveUserIdFromCookies} = require('../services/auth');
const User = require("../models/User");
>>>>>>> origin

const bcrypt = require('bcrypt');
const User = require('../model/User');
const TempUser = require('../model/tempUserModel');
const { sendOtpViaEmail } = require('../services/mailServices');
const { setUser, setUserCookies, giveUserIdFromCookies, googleAuth } = require('../services/auth');

// Constants
const OTP_EXPIRY_MINUTES = 10;
const SALT_ROUNDS = 10;

/**
 * Generate a 6-digit OTP
 */
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * Get OTP expiry date
 */
const getOTPExpiry = () => new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

// ==========================================
// SIGNUP METHODS
// ==========================================

/**
 * Send OTP for signup
 */
const sendOtpToSignup = async (req, res) => {
    const {name, email, password} = req.body;

    try {
<<<<<<< HEAD
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'User already exists' });
        }

        // Check if OTP already sent
        const tempUser = await TempUser.findOne({ email });
        if (tempUser) {
            return res.status(400).json({ success: false, msg: 'OTP already sent. Please verify.' });
=======
        // Check if the user already exists in the main userModel
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.json({success: false, msg: "User already exists"});
        }

        // Check if an unverified user already exists
        const tempUser = await tempUserModel.findOne({email});
        if (tempUser) {
            return res.status(400).json({success: true, msg: "OTP already sent. Please verify."});
>>>>>>> origin
        }

        // Hash password and create temp user
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const otp = generateOTP();

<<<<<<< HEAD
        await TempUser.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt: getOTPExpiry()
        });
=======
        // Save user temporarily
        await tempUserModel.create({name, email, password: hashedPassword, otp, otpExpiresAt});
>>>>>>> origin

        // Send OTP
        await sendOtpViaEmail(email, otp);

<<<<<<< HEAD
        return res.status(200).json({ success: true, msg: 'OTP sent successfully' });
    } catch (err) {
        console.error('sendOtpToSignup error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
=======
        return res.status(200).json({success: true, msg: "OTP sent successfully"});

    } catch (err) {
        console.error("Error in sendOtpToSignup:", err);
        return res.status(500).json({success: false, msg: "Internal server error"});
>>>>>>> origin
    }
};

/**
 * Verify OTP and complete signup
 */
const verifyOtpToSignup = async (req, res) => {
    const {email, otp} = req.body;

    try {
<<<<<<< HEAD
        const tempUser = await TempUser.findOne({ email });

        if (!tempUser) {
            return res.status(404).json({ success: false, msg: 'User not found or OTP expired' });
=======
        // Find the unverified user in the temp collection
        const tempUser = await tempUserModel.findOne({email});

        if (!tempUser) {
            return res.status(404).json({success: false, msg: "User not found or OTP expired"});
>>>>>>> origin
        }

        if (tempUser.otp !== otp) {
<<<<<<< HEAD
            return res.status(400).json({ success: false, msg: 'Invalid OTP' });
=======
            return res.status(400).json({success: false, msg: "Invalid OTP"});
>>>>>>> origin
        }

        if (tempUser.otpExpiresAt < Date.now()) {
<<<<<<< HEAD
            await TempUser.deleteOne({ email });
            return res.status(400).json({ success: false, msg: 'OTP has expired' });
=======
            await tempUserModel.deleteOne({email}); // Cleanup expired user
            return res.status(400).json({success: false, msg: "OTP has expired"});
>>>>>>> origin
        }

        // Create user
        const newUser = await User.create({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password,
            verified: true
        });

<<<<<<< HEAD
        // Cleanup temp user
        await TempUser.deleteOne({ email });

        // Generate token and set cookie
        const token = setUser(newUser);
        setUserCookies(res, token);
=======
        // Delete temporary user
        await tempUserModel.deleteOne({email});

        // Generate JWT token
        const token = setUser(newUser)
        setUserCookies(res, token);

        return res.status(200).json({
            success: true,
            message: 'User verified successfully'
        });
>>>>>>> origin

        return res.status(200).json({ success: true, msg: 'User verified successfully', token });
    } catch (err) {
<<<<<<< HEAD
        console.error('verifyOtpToSignup error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
=======
        console.error("Error in verifyOtpToSignup:", err);
        return res.status(500).json({success: false, msg: "Internal server error"});
>>>>>>> origin
    }
};

// ==========================================
// LOGIN METHODS
// ==========================================

<<<<<<< HEAD
/**
 * Login with email and password
 */
const forLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, msg: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, msg: 'Password incorrect' });
        }

        const token = setUser(user);
        setUserCookies(res, token);

        return res.status(200).json({
            success: true,
            msg: 'Login successful',
            token,
            profilePicture: user.profilePicture
        });
    } catch (err) {
        console.error('forLogin error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

/**
 * Google OAuth login
 */
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, msg: 'Token is required' });
        }

        const { user, authToken } = await googleAuth(token);
        setUserCookies(res, authToken);

        return res.status(200).json({
            success: true,
            msg: 'Login successful',
            token: authToken,
            user
        });
    } catch (error) {
        console.error('googleLogin error:', error);
        return res.status(401).json({
            success: false,
            msg: 'Google authentication failed',
            details: error.message
        });
    }
};

/**
 * Check if user is logged in
 */
const isUserLoggedIn = async (req, res) => {
    try {
        const userId = giveUserIdFromCookies(req.cookies.userId);

        if (!userId) {
            return res.status(401).json({ success: false, msg: 'User not logged in' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not found' });
        }

        return res.status(200).json({ success: true, msg: 'User is logged in' });
    } catch (error) {
        console.error('isUserLoggedIn error:', error);
        return res.status(401).json({ success: false, msg: 'User not logged in' });
    }
};

// ==========================================
// PASSWORD RESET METHODS
// ==========================================

/**
 * Send OTP for forgot password
 */
const sendOtpForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: "User doesn't exist" });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = getOTPExpiry();
        await user.save();

        await sendOtpViaEmail(email, otp);

        return res.status(200).json({ success: true, msg: 'OTP sent successfully' });
    } catch (err) {
        console.error('sendOtpForgotPassword error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

/**
 * Verify OTP for forgot password
 */
const verifyOtpForgotPassword = async (req, res) => {
    const { otp, email } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ success: false, msg: 'Email and OTP are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, msg: 'Invalid OTP' });
        }

        if (user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, msg: 'OTP has expired' });
        }

        const token = setUser(user);
        setUserCookies(res, token);

        return res.status(200).json({ success: true, msg: 'OTP verified successfully', token });
    } catch (err) {
        console.error('verifyOtpForgotPassword error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

/**
 * Set new password
 */
const setNewPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ success: false, msg: 'Email and new password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await user.save();

        return res.status(200).json({ success: true, msg: 'Password changed successfully' });
    } catch (err) {
        console.error('setNewPassword error:', err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};
=======
//forgot password during the login
const sendOtpForgotPassword = async (req, res) => {
    const {email} = req.body;

    //generate otp & expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    try {

        //userModel exists or not
        const User = await userModel.findOne({email});

        if (!User) {
            return res.json({success: false, msg: "User doesn't exists"});
        }

        //send otp
        await sendOtpViaEmail(email, otp)


        User.otp = otp,
            User.otpExpiresAt = otpExpiresAt

        //save otp to database
        await User.save();


        res.status(200).json({success: true, msg: "Otp send successful !"})

    } catch (err) {

        console.log(`Error occured in send otp  : ${err}`);

    }
}

const verifyOtpForgotPassword = async (req, res) => {
    const {otp, email} = req.body;

    //check is empty or not
    if (!otp || !email) {
        return res.status(400).json({success: false, msg: "All fields are required Email and OTP !"});
    }

    try {
        //find userModel
        const User = await userModel.findOne({email});

        if (!User) {
            return res.status(404).json({success: false, msg: "User not found"});
        }

        //check is invalid or expiration
        if (User.otp !== otp) {
            return res.status(400).json({success: false, msg: "Otp is invalid"});
        }

        if (User.otpExpiresAt < Date.now()) {
            return res.status(400).json({success: false, msg: "Otp has expired"});
        }


        //sign a jwt token
        const token = setUser(User)
        setUserCookies(res, token);
        return res.status(200).json({success: true, message: 'User verified successfully', token});

    } catch (err) {
        console.log(`Error occurred in verifyOtpForgotPassword: ${err}`);
        return res.status(500).json({success: false, msg: "Internal server error"});
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
        User.password = await bcrypt.hash(newPassword, 5);
        await User.save();

        res.status(200).json({success: true, message: 'Password changed successfully'});

    } catch (err) {

        console.log(`Error occur in verify otp : ${err}`);

    }
}

const forLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email && !password) {
            res.json({success: false, msg: "All feild are required !"});
        }

        const data = await userModel.findOne({email});
        if (!data) {
            res.json({success: false, msg: "User Not found"});
        }
        const isPassValid = await bcrypt.compare(password, data.password)
        if (isPassValid) {
            const token = setUser(data)
            setUserCookies(res, token);

            return res.json({
                success: true, msg: "Login Successful", token, profilePicture: data.profilePicture
            })
        } else {
            res.json({success: false, msg: "Password Incorrect"})
        }
    } catch (err) {
        console.log(`Error occur in forLogin : ${err}`);
        res.status(500).json({success: false, msg: "Internal server error"});
    }
}

const isUserLoggedIn = async (req,res) => {

    try {
        const userIdFromCookies = giveUserIdFromCookies(req.cookies.authToken);

        if(!userIdFromCookies) {
            return res.status(401).json({error:"User not logged in"});
        }

        const user = await User.findById(userIdFromCookies);

        if (!user){
            return res.status(401).json({error: "User not signed Up"});
        }

        return res.status(200).json({message: "User is logged in"});
    }catch (error) {
        console.error(error);
        return res.status(401).json({error:"User not logged in"});
    }
}
>>>>>>> origin

module.exports = {
    sendOtpToSignup,
    verifyOtpToSignup,
    sendOtpForgotPassword,
    verifyOtpForgotPassword,
    setNewPassword,
    forLogin,
<<<<<<< HEAD
    isUserLoggedIn,
    googleLogin
};
=======
    isUserLoggedIn
}
>>>>>>> origin

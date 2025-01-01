const user = require('../model/user')
const z = require('zod');
const sendOtpTwilio = require('../utils/sendOtpTwilio');
const jwt = require('jsonwebtoken');


// validation schema by zod ------------------------------------------------
const userSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    mobile: z.string().nonempty(),
})

//signupSendOtp method -----------------------------------------------------
const sendOtp = async (req, res) => {
    const { firstName, lastName, mobile,password } = req.body;

    //generate otp & expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    
    try {
        
        //user exists or not
        const User = await user.findOne({ mobile });
        
        if (User) {

            //already exists    
            User.otp = otp;
            User.otpExpiresAt = otpExpiresAt;
            await User.save();
        
        } else {

            if(!firstName || !lastName){
                res.status(400).json({success:false,msg:"All fields are required!"});
            }

            const zodMsg = userSchema.safeParse({ firstName: firstName, lastName: lastName, mobile: mobile })
            
            //validation
            if (!zodMsg.success) {
                res.status(403).json(zodMsg);
            }

            //create new user
            await user.create({
                firstName,
                lastName,
                mobile,
                otp,
                otpExpiresAt
            })
        }
        
        //send otp
        await sendOtpTwilio(mobile, otp)

        res.status(200).json({ success: true, msg: "Otp send successful !" })

    }
    catch (err) {

        console.log(`Error occured in send otp  : ${err}`);

    }
}

const verifyOtp = async (req, res) => {
    const { otp, mobile } = req.body;

    //check is empty or not
    if (!otp || !mobile) {
        res.status(400).json({ success: false, msg: "All fields are required !" });
    }

    try {
        //find user
        const User = await user.findOne({ mobile });

        //check is invalid or expiration
        if (User.otp != otp) {
            res.json({ success: false, msg: "Otp is invalid" })
        }

        if (User.otpExpiresAt < Date.now()) {
            res.json({ success: false, msg: "Otp is Expires" })
        }

        await User.save();

        //sign a jwt token
        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('auth-token',token);
        res.status(200).json({ message: 'User verified successfully', token });
    
    } catch (err) {

        console.log(`Error occur in verify otp : ${err}`);

    }
}
module.exports = {
    sendOtp,
    verifyOtp
}
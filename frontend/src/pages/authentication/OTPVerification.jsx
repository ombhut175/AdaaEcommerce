import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const OTPVerification = () => {
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    // Handle OTP input change
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // Function to verify the OTP entered by the user
    const verifyOtp = () => {
        if (!otp || otp.length !== 6) {
            setErrors('Please enter a valid 6-digit OTP.');
            return;
        }
        setErrors('');

        // Assume you already have the email sent earlier
        const email = localStorage.getItem('email'); // Retrieve email from storage
        
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/signup/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setIsVerified(true);
                    toast.success(data.msg);
                    localStorage.setItem('auth-token',data.token)
                    navigate('/home'); // Redirect to home page after successful OTP verification
                    
                } else {
                    console.log(data);
                    
                    setErrors(data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrors('Error verifying OTP.');
            });
    };

    return (
        <div className="h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-800">
            <div className="w-full max-w-md md:hover:scale-105 transition-all p-8 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-slate-800 dark:text-slate-100 mb-6">OTP Verification</h1>
                
                {/* OTP Input Form */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer"
                        maxLength={6}
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="otp"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter OTP
                    </label>
                </div>

                <div className="text-center my-3">
                    <button
                        onClick={verifyOtp}
                        className="w-full text-lg py-2 active:scale-95 transition-all bg-slate-800 text-white rounded-md dark:bg-slate-200 dark:text-slate-800"
                    >
                        Verify OTP
                    </button>

                </div>

                {errors && <div className="text-red-500 text-xs text-center">{errors}</div>}
                {isVerified && (
                    <div className="p-2 text-green-500 text-lg text-center">
                        OTP Verified Successfully!
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default OTPVerification;

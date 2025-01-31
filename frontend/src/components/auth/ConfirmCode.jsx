import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {fetchUser, logInUser} from "../../store/features/userSlice.js";
import {useDispatch} from "react-redux";
import {LoadingBar} from "../loadingBar/LoadingBar.jsx";

function ConfirmCode() {
    const [otp, setOtp] = useState('')
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Function to verify the OTP entered by the user
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsDisabled(true);
        if (!otp || otp.length !== 6) {
            setErrors('Please enter a valid 6-digit OTP.');
            return;
        }
        setErrors('');

        // Assume you already have the email sent earlier
        const email = localStorage.getItem('email'); // Retrieve email from storage

        fetch(BACKEND_URL + '/api/signup/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, otp}),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem('authToken', data.token)
                    toast(data.msg);
                    dispatch(fetchUser());
                    dispatch(logInUser());
                    navigate('/'); // Redirect to home page after successful OTP verification

                } else {
                    console.log(data);
                    toast(data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrors('Error verifying OTP.');
            })
            .finally(() => setIsDisabled(false));
    };
    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <LoadingBar isLoading={isDisabled}/>
            <div className="flex-1 hidden lg:block">
                <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop"
                    alt="Fashion"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8 animate-fadeIn">
                    <div className="text-center transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-orange-400 mb-2 animate-scaleIn">
                            Enter The Confirmation Code
                        </h2>
                        <p className="text-gray-600 dark:text-teal-300 animate-slideIn"
                           style={{animationDelay: '0.2s'}}>
                            We've sent a confirmation code to your email address.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <input
                                type="text"
                                placeholder="Confirmation Code"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:border-teal-600 dark:bg-gray-800 dark:text-orange-300 dark:placeholder-teal-400 transition-all duration-300"
                                name="otp"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            {errors && <span className='text-red-700'>{errors}</span>}
                        </div>

                        <button
                            type="submit"
                            className={`w-full p-4 rounded-lg transition-all duration-300 transform ${
                                isDisabled
                                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                    : "bg-gray-900 dark:bg-orange-500 text-white hover:bg-gray-800 dark:hover:bg-orange-400 hover:scale-105 hover:shadow-lg active:scale-95"
                            }`}
                            disabled={isDisabled}
                        >
                            Recover Account
                        </button>


                        {/* <p className="text-center text-sm animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              Didn't receive Confirmation Code?{' '}
              <button
                className="text-gray-900 dark:text-teal-400 hover:text-gray-700 dark:hover:text-teal-300 transition-all duration-300 hover:scale-110 inline-block"
                onClick={handleResend}
              >
                Resend Now
              </button>
            </p> */}
                    </form>

                    <p className="text-center text-sm text-gray-600 dark:text-teal-300 animate-fadeIn"
                       style={{animationDelay: '0.6s'}}>
                        By continuing, you agree to ADAA's{' '}
                        <Link to="/terms"
                              className="text-gray-900 dark:text-orange-400 hover:text-gray-700 dark:hover:text-orange-300 transition-all duration-300">
                            Terms & Conditions
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConfirmCode
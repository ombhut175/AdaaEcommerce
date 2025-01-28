import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [otp, setOtp] = useState('')
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  // Function to verify the OTP entered by the user
  const handleSubmit = (e) => {
      e.preventDefault()
      if (!otp || otp.length !== 6) {
          setErrors('Please enter a valid 6-digit OTP.');
          return;
      }
      setErrors('');
  
      // Assume you already have the email sent earlier
      const email = localStorage.getItem('email'); // Retrieve email from storage
      
      fetch(BACKEND_URL+ '/api/login/verify-otp-forgot', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp }),
      })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            
              if (data.success) {
                  localStorage.setItem('authToken',data.token)
                  toast(data.msg);
                  navigate('/reset-password'); // Redirect to home page after successful OTP verification
                  
              } else {
                  toast(data.msg)
              }
          })
          .catch((err) => {
              console.log(err);
              setErrors('Error verifying OTP.');
          });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="flex-1 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your code for reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <input
                type="text"
                placeholder="Enter Code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
                onChange={(e) => setOtp(e.target.value)}
              />
              {errors && <span className='text-red-700'>{errors}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Go
            </button>

            <p className="text-center text-sm">
              Remember your password?{' '}
              <Link
                to="/signin"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            By continuing, you agree to FASCO's{' '}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
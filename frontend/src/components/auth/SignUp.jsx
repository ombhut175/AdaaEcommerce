import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {GoogleButton} from "./GoogleButton.jsx";
import {LoadingBar} from "../loadingBar/LoadingBar.jsx";

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [otpSend, setOtpSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isHidePass, setIsHidePass] = useState(true);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const validate = (name, value) => {
    let error = '';
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Please enter a valid email address';
    } else if (name === 'password') {
      const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/;
      if (!passwordRegex.test(value)) {
        error = 'Password must be at least 6 characters long, include at least one number, and one special character';
      }
    } else if (name === 'name' && value.length < 2) {
      error = 'Enter minimum two letter';
    } else if (!error) {
      setErrors({})
      return true;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);

  };

  const validateForm = () => {
    console.log(formData);

    if (!formData.name) {
      setErrors(prev => ({ ...prev, name: "Please enter Name" }));
    } if (!formData.email) {
      setErrors(prev => ({ ...prev, email: "Please enter Email" }));
    } if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "Please enter Password" }));
    }
    return errors.length === undefined;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsDisabled(true);

    if (validateForm()) {
      
      setLoading(true)
      fetch(BACKEND_URL + "/api/signup/send-otp",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: "POST",
          body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          
          if (res.success) {
              
            localStorage.setItem('email', formData.email)
            localStorage.setItem('name', formData.name)
            localStorage.setItem('password', formData.password)
            setOtpSend(true);
            setLoading(false)
            toast(res.msg);
            navigate('/confirm-code')
          } else {
            setLoading(false)
            toast(res.msg)
            navigate('/signin')

          }

        })
        .catch(function (err) { console.log(err) })
          .finally(()=>setIsDisabled(false));
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <LoadingBar isLoading={isDisabled} />
      <div className="flex-1 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&h=1200&fit=crop"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-scaleIn">
              Create Account
            </h2>
          </div>

          <div className="flex gap-4 mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <GoogleButton />
          </div>

          <div className="relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4">
              <div className="transform hover:scale-105 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Full Name"
                  name='name'
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  onChange={handleChange}
                />
                {errors.name && <span className="text-red-700">{errors.name}</span>}
              </div>
              <div className="transform hover:scale-105 transition-all duration-300">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  name='email'
                  onChange={handleChange}
                />
                {errors.email && <span className="text-red-700">{errors.email}</span>}
              </div>
              <div className="relative">
                <input
                  type={isHidePass ? "password" : "text"}
                  placeholder="Password"
                  name="password"
                  className="relative w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  onChange={handleChange}
                />
                {errors.password && <span className="text-red-700">{errors.password}</span>}
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 p-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsHidePass(!isHidePass);
                  }}
                >
                  {isHidePass ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </button>
              </div>
            </div>

            <button
                type="submit"
                className={`w-full p-4 rounded-lg transition-all duration-300 transform ${
                    isDisabled
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800 hover:scale-105 hover:shadow-lg active:scale-95"
                }`}
                disabled={isDisabled}
            >
              Create Account
            </button>


            <p className="text-center text-sm animate-fadeIn dark:text-white" style={{ animationDelay: '0.5s' }}>
              Already have an account?{' '}
              <Link
                to="/signIn"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all duration-300 hover:scale-110 inline-block"
              >
                Login
              </Link>
            </p>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            By continuing, you agree to FASCO's{' '}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all duration-300">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
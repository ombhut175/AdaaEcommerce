import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../redux/slice/userPreferences";
import { GoogleButton } from "../components/GoogleButton";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const userPreferences = useSelector(state => state.userPreferences);
    const dispatch = useDispatch();

    const toggleDarkMode = () => {
        const newMode = !userPreferences.isDarkMode;
        dispatch(setMode(newMode));
    };

    useEffect(() => {
        const rootClass = document.documentElement.classList;
        if (userPreferences.isDarkMode) {
            rootClass.add('dark');
        } else {
            rootClass.remove('dark');
        }
    }, [userPreferences.isDarkMode]);

    const validate = (name, value) => {
        let error = '';
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Please enter a valid email address';
        } else if (name === 'password' && value.length < 6) {
            error = 'Password must be at least 6 characters long';
        }
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors.email && !errors.password) {
            console.log('Form Submitted:', formData);
            // Add login logic here
        }
    };

    return (
        <div className="h-screen  flex justify-center items-center bg-slate-50 dark:bg-slate-800">
            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className="absolute top-10 right-10"
                aria-label="Toggle Dark Mode"
            >
                {userPreferences.isDarkMode ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-6 h-6 text-slate-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-6 h-6 text-slate-800"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                    </svg>
                )}
            </button>

            {/* Login Form */}
            <div className="w-full max-w-md md:hover:scale-105 transition-all p-8 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-slate-800 dark:text-slate-100 mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 text-lg border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-slate-600 dark:border-gray-600 dark:focus:border-slate-400"
                            placeholder="Email Address"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 text-lg border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-slate-600 dark:border-gray-600 dark:focus:border-slate-400"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="text-center my-3">
                        <button
                            type="submit"
                            className="w-full text-lg py-2 active:scale-95 transition-all bg-slate-800 text-white rounded-md dark:bg-slate-200 dark:text-slate-800"
                            disabled={!!errors.email || !!errors.password}
                        >
                            Login
                        </button>
                    </div>
                    <GoogleButton />
                    <div className="text-center mt-4 my-2">
                        <Link to="/signup" className="text-slate-800 dark:text-slate-400 underline">Create New Account </Link>
                    </div>
                    <div className="text-center mt-4 my-2">
                        <Link to="/signup" className="text-slate-800 dark:text-slate-400 underline">Forgot Password?</Link>
                    </div>
                        
                </form>
            </div>
        </div>
    );
};

export default Login;

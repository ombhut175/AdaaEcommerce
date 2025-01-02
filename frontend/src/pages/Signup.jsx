import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/slice/userPreferences.js';
import { GoogleButton } from '../components/GoogleButton.jsx';

const InputField = ({ id, type, value, handleChange, error, label }) => (
    <div className="relative z-0 mb-4">
        <input
            type={type}
            id={id}
            value={value}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
        />
        <label
            htmlFor={id}
            className="absolute text-lg text-gray-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            {label}
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const userPreferences = useSelector(state => state.userPreferences);
    const dispatch = useDispatch();

    const isDark = userPreferences.isDarkMode;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggleDarkMode = () => {
        dispatch(setMode(!isDark));
    };

    const validateField = (id, value) => {
        if (!value.trim()) {
            return `${id.charAt(0).toUpperCase() + id.slice(1)} is required`;
        }
        if (id === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            return 'Enter a valid email address';
        }
        if (id === 'password' && value.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        return '';
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: validateField(id, value) });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted', formData);
            // Add submission logic
        }
    };

    return (
        <div className="h-screen flex items-center justify-center dark:bg-slate-800 bg-slate-50">
            {/* Toggle Button */}
            <button
                onClick={toggleDarkMode}
                className="absolute top-10 right-10 focus:outline-none"
            >
                {isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-800 dark:text-slate-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-800 dark:text-slate-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                )}
            </button>

            {/* Signup Form */}
            <div className="rounded-2xl md:hover:scale-105 shadow-md transition-all p-16 w-96 md:w-[450px] bg-white dark:bg-slate-900">
                <h1 className="text-3xl font-semibold mb-5 text-center text-slate-800 dark:text-slate-100">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'password'].map((field) => (
                        <InputField
                            key={field}
                            id={field}
                            type={field === 'password' ? 'password' : 'text'}
                            value={formData[field]}
                            handleChange={handleChange}
                            error={errors[field]}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                    ))}

                    <div className="w-full text-center my-5">
                        <button type="submit" className="w-full px-8 py-2 bg-slate-800 md:text-xl active:scale-95 transition-all text-slate-50 rounded-md dark:bg-slate-200 dark:text-slate-800">
                            Sign Up
                        </button>
                    </div>
                    <GoogleButton />
                    <div className="w-full text-center my-6 dark:text-slate-400">
                        <Link to="/login" className="underline">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

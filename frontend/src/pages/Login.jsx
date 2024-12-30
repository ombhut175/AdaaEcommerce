import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    // Initialize dark mode state from localStorage or default to false
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for dark mode preference
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const handleGoogleSignIn = () => {
        // Implement Google sign-in logic
    };

    const handleLogin = (event) => {
        event.preventDefault();
        // Implement login logic
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            // Save new mode to localStorage
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        // Apply the dark mode class to the root element based on the state
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <div
            className={`min-h-screen grid place-items-center px-4 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
            }`}
        >
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800"
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-4xl font-bold text-center dark:text-gray-100 header_2_color">Login</h2>
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-4">
                        <label
                            htmlFor="mobile"
                            className="block text-sm font-medium dark:text-gray-300"
                        >
                            Mobile 
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter mobile number"
                            required
                            maxLength="10"
                            pattern="[0-9]{10}"
                            autoComplete="tel"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            autoComplete="current-password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Login
                    </button>
                </form>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                >
                    Sign in with Google
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className="hover:underline focus:outline-none dark:text-gray-300"
                    >
                        Forgot Password?
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="hover:underline focus:outline-none text-right dark:text-gray-300"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

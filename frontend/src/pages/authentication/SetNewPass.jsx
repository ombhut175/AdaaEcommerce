import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SetNewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Function to set a new password
    const submitNewPassword = () => {
        if (!password || !confirmPassword) {
            setErrors('Both fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setErrors('Passwords do not match.');
            return;
        }

        setErrors('');

        const email = localStorage.getItem('email'); // Retrieve email from localStorage

        fetch(import.meta.env.VITE_BACKEND_URL + '/api/login/set-new-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword: password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Password changed successfully!');
                    navigate('/home'); // Redirect to home page after success
                } else {
                    setErrors(data.msg || 'An error occurred. Please try again.');
                }
            })
            .catch((err) => {
                console.log(err);
                setErrors('Failed to set new password. Please try again.');
            });
    };

    // Handle skip action
    const handleSkip = () => {
        toast.info('You skipped setting a new password.', {
            position: toast.POSITION.TOP_CENTER,
        });
        navigate('/home'); // Redirect to home page
    };

    return (
        <div className="h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-800">
            <div className="w-full max-w-md md:hover:scale-105 transition-all p-8 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-slate-800 dark:text-slate-100 mb-6">
                    Set New Password
                </h1>

                {/* Password Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        New Password
                    </label>
                </div>

                {/* Confirm Password Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="confirmPassword"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Confirm Password
                    </label>
                </div>

                {/* Submit and Skip Buttons */}
                <div className="text-center my-3">
                    <button
                        onClick={submitNewPassword}
                        className="w-full text-lg py-2 active:scale-95 transition-all bg-slate-800 text-white rounded-md dark:bg-slate-200 dark:text-slate-800 mb-3"
                    >
                        Set Password
                    </button>
                    <button
                        onClick={handleSkip}
                        className="w-full text-lg py-2 active:scale-95 transition-all bg-gray-300 text-slate-800 rounded-md dark:bg-gray-700 dark:text-white"
                    >
                        Skip
                    </button>
                </div>

                {errors && <div className="text-red-500 text-xs text-center">{errors}</div>}
            </div>
        </div>
    );
};

export default SetNewPassword;

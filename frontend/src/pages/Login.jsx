import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setMode} from "../redux/slice/userPreferences.js";
import {GoogleButton} from "../components/GoogleButton.jsx";

const Login = () => {
    const [isDark, setIsDark] = useState(false);
    const [formData, setFormData] = useState({mobile: '', password: ''});
    const [errors, setErrors] = useState({mobile: '', password: ''});
    const userPreferences = useSelector(state => state.userPreferences);
    const dispatch = useDispatch();


    const toggleDarkMode = () => {
        dispatch(setMode(!isDark));
        setIsDark(!isDark);
    };

    useEffect(() => {
        setIsDark(userPreferences.isDarkMode);
    }, []);

    useEffect(() => {
        setIsDark(userPreferences.isDarkMode);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const validate = (name, value) => {
        let error = '';
        if (name === 'mobile') {
            if (!/^[6-9]\d{9}$/.test(value)) {
                error = 'Please enter a valid 10-digit mobile number';
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                error = 'Password must be at least 6 characters long';
            }
        }
        setErrors((prev) => ({...prev, [name]: error}));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors.mobile && !errors.password) {
            console.log('Form Submitted:', formData);
            // Add login logic here
        }
    };

    return (
        <div className='h-screen dark:bg-slate-800 bg-slate-50'>
            <div className={`w-full p-3 ${isDark ? 'bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-800'}`}>
                <button onClick={toggleDarkMode} className="focus:outline-none">
                    {!isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                            />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                        </svg>
                    )}
                </button>
            </div>

            <form onSubmit={handleSubmit}
                  className={`flex justify-center my-20 w-full ${isDark ? 'bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-800'}`}>
                <div className='w-80 text-slate-800 dark:text-slate-50'>
                    <div className='w-full text-center'>
                        <h1 className='text-3xl md:text-4xl my-4 header_2_color'>Login</h1>
                    </div>

                    <div className="relative z-0">
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-slate-600 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="mobile"
                            className="absolute text-lg text-gray-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Mobile Number
                        </label>
                        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>

                    <div className="relative z-0 my-6">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-slate-600 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-lg text-gray-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className='w-full text-center my-2'>
                        <button type="submit"
                                className='px-8 py-2 bg-slate-800 md:text-xl active:scale-95 transition-all text-slate-50 rounded-md dark:bg-slate-200 dark:text-slate-800'
                                disabled={errors.mobile || errors.password}>
                            Login
                        </button>
                    </div>
                    <div className='w-full text-center my-5'>
                        <Link to="/signup" className='underline'>SignUp</Link>
                    </div>
                    <GoogleButton/>
                </div>
            </form>
        </div>
    );
};

export default Login;

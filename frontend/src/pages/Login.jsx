import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../redux/slice/userPreferences";
import { GoogleButton } from "../components/GoogleButton";


const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLogin,setIsLogin] = useState(false);
    const [isHidePass,setIsHidePass] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const userPreferences = useSelector(state => state.userPreferences);
    const dispatch = useDispatch();
    const navigate = useNavigate()

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
        } else if (name === 'password') {
            const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/;
            if (!passwordRegex.test(value)) {
                error = 'Password must be at least 6 characters long, include at least one number, and one special character';
            }
        }
        setErrors(prev => ({ ...prev, [name]: error })); // Update the error state
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (true) {
            console.log('Form Submitted:', formData);
            
            setLoading(true);
            fetch(import.meta.env.VITE_BACKEND_URL+ "/api/login",
                {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },credentials: 'include',
                    method: "POST",
                    body: JSON.stringify(formData)
                })
                .then(function(res){ return res.json() })
                .then((res)=>{
                    if(res.success==true){
                        setIsLogin(true)
                        localStorage.setItem('auth-token',res.token);
                        setLoading(false);
                            navigate('/')
                        
                    }
                })
                .catch(function(res){ console.log(res) })
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
            {loading?/* From Uiverse.io by Fresnel11 */ 
<div
  class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
></div>
:
            <div className="w-full max-w-md md:hover:scale-105 transition-all p-8 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-slate-800 dark:text-slate-100 mb-6">Login</h1>
                
                    <form className="max-w-md mx-auto" noValidate={true} >
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="email" name="email" id="floating_email" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />
                            <label form="floating_email" className={` peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Email address</label>
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type={`${isHidePass?"password":"text"}`} name="password" id="floating_password" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />
                            <label form="floating_password" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Password</label>
                            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                            {
                            isHidePass ? <label className='absolute top-2 right-2'><button className='p-1' onClick={(e)=>{
                                e.preventDefault()
                                setIsHidePass(false)}}><i class="fa-regular fa-eye dark:text-slate-400"></i></button></label>
                            :<label className='absolute top-2 right-2 dark:text-slate-400'><button className='p-1' onClick={(e)=>{
                                e.preventDefault()
                                setIsHidePass(true)}}><i class="fa-regular fa-eye-slash"></i></button></label>
                            }
                        </div>
                       </form>

                    <div className="text-center my-3">
                        <button
                            onClick={handleSubmit}
                            className="w-full text-lg py-2 active:scale-95 transition-all bg-slate-800 text-white rounded-md dark:bg-slate-200 dark:text-slate-800"
                            // disabled={errors.email || errors.password}
                        >
                            Login
                        </button>
                    </div>
                    <GoogleButton />
                    <div className="text-center mt-4 my-2">
                        <Link to="/signup" className="text-slate-800 dark:text-slate-400 underline">Create New Account </Link>
                    </div>
                    <div className="text-center mt-4 my-2">
                        <Link onClick={()=>{
                            if(!errors.email ){
                                if(formData.email.length > 0){
                                    setLoading(true)
                                    fetch(import.meta.env.VITE_BACKEND_URL + "/api/login/send-otp-forgot",
                                        {
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },credentials: 'include',
                                            method: "POST",
                                            body: JSON.stringify(formData)
                                        }
                                    )
                                    .then((res)=>res.json())
                                    .then((res)=>{
                                        if(res.success){
                                            navigate('/verify-otp-forgot')
                                        }
                                        setLoading(false)
                                    })
                                }else{
                                    setErrors(prev => ({ ...prev, "email": "Email is required" }));
                                }
                            }
                        }} className="text-slate-800 dark:text-slate-400 underline">Forgot Password?</Link>
                    </div>
                    {isLogin?<div className='p-2 text-green-500 text-lg text-center'>
                        Login Successful
                    </div>:""}
                
            </div>}
        </div>

    );
};

export default Login;

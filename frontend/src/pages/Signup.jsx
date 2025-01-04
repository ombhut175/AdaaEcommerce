import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/slice/userPreferences.js';
import { GoogleButton } from '../components/GoogleButton.jsx';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [otpSend,setOtpSend] = useState(false);
    const [loading,setLoading] = useState(false);
    
    const userPreferences = useSelector(state => state.userPreferences);
    const dispatch = useDispatch();
    const [isHidePass,setIsHidePass] = useState(true);
    const isDark = userPreferences.isDarkMode;
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggleDarkMode = () => {
        dispatch(setMode(!isDark));
    };

    const validate = (name, value) => {
        let error = '';
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Please enter a valid email address';
        } else if (name === 'password') {
            const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/;
            if (!passwordRegex.test(value)) {
                error = 'Password must be at least 6 characters long, include at least one number, and one special character';
            }
        }else if(name==='name' && value.length<2){
            error = 'Enter minimum two letter';
        }else if(!error){
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

   
    const handleSubmit = (e) => {
        e.preventDefault();
            console.log(errors.length);
            
            if(errors.length==undefined)
            {
                console.log('Form submitted', formData);
                setLoading(true)
                fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup/send-otp",
                    {
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        credentials:'include',
                        method: "POST",
                        body: JSON.stringify(formData)
                    })
                    .then((res)=>res.json())
                    .then((res)=>{
                        if(res.success){
                            
                            localStorage.setItem('email',formData.email)
                            setOtpSend(true);
                            setLoading(false)
                            navigate('/verify')
                        }else{
                            setLoading(false)
                            toast.success(res.msg)
                            navigate('/login')
                            
                        }
                        
                    })
                    .catch(function(err){ console.log(err) })
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

{loading? 
    <div
    class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
  ></div>
    :
<div className="rounded-2xl md:hover:scale-105 shadow-md transition-all p-16 w-96 md:w-[450px] bg-white dark:bg-slate-900">
                <h1 className="text-3xl font-semibold mb-5 text-center text-slate-800 dark:text-slate-100">Sign Up</h1>
                <form  noValidate>
                <div class="relative z-0 w-full mb-5 group">
                            <input type="email" name="email" id="email"  onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />
                            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type={`${isHidePass?"password":"text"}`} name="password" id="floating_password" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />
                            <label form="floating_password" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Password</label>
                            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                            {
                            isHidePass ? <label className='absolute top-2 right-2'><button className='p-1'onClick={(e)=>{
                                e.preventDefault()
                                setIsHidePass(false)
                            }}><i class="fa-regular fa-eye dark:text-slate-400"></i></button></label>
                            :<label className='absolute top-2 right-2'><button className='p-1' onClick={(e)=>{
                                e.preventDefault()
                                setIsHidePass(true)
                            }}><i class="fa-regular fa-eye-slash dark:text-slate-400"></i></button></label>
                            }
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="text" name="name" onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />
                                <label  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-600 peer-focus:dark:text-slate-300 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                        
                        </div>
                    <div className="w-full text-center my-5">
                        <button onClick={handleSubmit} className="w-full px-8 py-2 bg-slate-800 md:text-xl active:scale-95 transition-all text-slate-50 rounded-md dark:bg-slate-200 dark:text-slate-800">
                            Sign Up
                        </button>
                    </div>
                    <GoogleButton />
                    <div className="w-full text-center my-6 dark:text-slate-400">
                        <Link to="/login" className="underline">Already have an account?</Link>
                    </div>
                    {otpSend?<div className='p-2 text-green-500 text-lg text-center'>
                        Otp send in your E-mail.
                    </div>:""}
                </form>
            </div>
}

</div>
    );
};

export default Signup;

import { fetchUser, logInUser } from "../store/features/userSlice";
import { createContext, useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../services/auth.service";

const loginContext = createContext();


// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [loading, setLoading] = useState(false);
    const [isHidePass, setIsHidePass] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

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
        setErrors(prev => ({ ...prev, [name]: error }));
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };


    const handleForgot = (e) => {
        e.preventDefault()

        if (!formData.email) {
            setErrors({ "email": "Please Enter Email" })
        }
        forgotPassword(BACKEND_URL,formData)
        .then((res)=>{
            if(res.success){
                toast(res.msg);
                setErrors({});
                navigate('/forgot-password');
            }
        })
        .catch((err)=>{
            toast(err.message)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsDisabled(true);
        console.log('Form Submitted:', formData);

        setLoading(true);


        fetch(BACKEND_URL + "/api/login",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, credentials: 'include',
                method: "POST",
                body: JSON.stringify(formData)
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);

                if (res.success) {
                    setLoading(false);
                    toast(res.msg);
                    dispatch(fetchUser());
                    dispatch(logInUser());
                    navigate('/')

                } else {
                    toast(res.msg)
                }
            })
            .catch(function (res) { console.log(res) })
            .finally(() => setIsDisabled(false));
    };


    return (
        <loginContext.Provider value={{
            errors,
            loading,
            handleChange,
            handleSubmit,
            handleForgot,
            isHidePass,
            setErrors,
            setIsHidePass,
            formData,
            setFormData
        }}>
            {children}
        </loginContext.Provider>
    )
}


export default function useLoginForm() {
    const context = useContext(loginContext)
    if (!context) {
        console.log("Login context is not found");
        return;
    }
    return context
}
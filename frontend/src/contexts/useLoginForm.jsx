import { fetchUser, logInUser } from "../store/features/userSlice";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";

const loginContext = createContext();


// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };


    const handleForgot = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            setErrors({ email: "Please enter your email" });
            return;
        }

        setLoading(true);
        try {
            const data = await authService.sendForgotPasswordOtp(formData.email);
            if (data.success) {
                toast(data.msg);
                setErrors({});
                navigate('/forgot-password');
            } else {
                toast(data.msg);
                setErrors({ email: data.msg || 'Please try again.' });
            }
        } catch (err) {
            console.error('Error sending OTP:', err);
            const errorMessage = err.response?.data?.msg || 'Error verifying OTP.';
            toast(errorMessage);
            setErrors({ email: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsDisabled(true);
        setLoading(true);

        try {
            const data = await authService.login(formData);
            if (data.success) {
                toast(data.msg);
                dispatch(fetchUser());
                dispatch(logInUser());
                navigate('/');
            } else {
                toast(data.msg);
            }
        } catch (err) {
            console.error('Login error:', err);
            toast(err.response?.data?.msg || 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
            setIsDisabled(false);
        }
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
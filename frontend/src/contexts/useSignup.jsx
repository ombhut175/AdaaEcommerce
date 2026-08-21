import { fetchUser } from "../store/features/userSlice";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";

const signupContext = createContext();

// eslint-disable-next-line react/prop-types
export const SignupProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({});
    const [otpSend, setOtpSend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isHidePass, setIsHidePass] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Please enter Name";
        if (!formData.email) newErrors.email = "Please enter Email";
        if (!formData.password) newErrors.password = "Please enter Password";
        if (formData.password) {
            const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/;
            if (!passwordRegex.test(formData.password)) {
                newErrors.password = "Password must be at least 6 characters long, include at least one number, and one special character";
            }
        }
        if (Object.keys(newErrors).length > 0) {
             setErrors(newErrors);
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsDisabled(true);
        setLoading(true);

        try {
            const data = await authService.sendSignupOtp(formData);
            if (data.success) {
                setOtpSend(true);
                toast(data.msg);
                navigate('/confirm-code');
            } else {
                toast(data.msg);
                navigate('/signin');
            }
        } catch (err) {
            console.error('Error sending OTP:', err);
            const errorMessage = err.response?.data?.msg || 'Error sending OTP.';
            toast(errorMessage);
        } finally {
            setLoading(false);
            setIsDisabled(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            setErrors(prev => (typeof prev === 'object' ? { ...prev, otp: 'Please enter a valid 6-digit OTP.' } : 'Please enter a valid 6-digit OTP.'));
            return;
        }

        const email = formData.email;
        console.log("email: ", email);
        setIsDisabled(true);
        setLoading(true);

        try {
            const data = await authService.verifySignupOtp({ email, otp });
            if (data.success) {
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }
                toast(data.msg || data.message || 'Signup successful!');
                dispatch(fetchUser());
                navigate('/signin');
            } else {
                toast(data.msg || 'OTP verification failed');
            }
        } catch (err) {
            console.error('Error verifying OTP:', err);
            const errorMessage = err.response?.data?.msg || 'Error verifying OTP.';
            toast(errorMessage);
            setErrors(prev => (typeof prev === 'object' ? { ...prev, otp: errorMessage } : errorMessage));
        } finally {
            setLoading(false);
            setIsDisabled(false);
        }
    };

    return (
        <signupContext.Provider value={{
            formData,
            setFormData,
            otp,
            setOtp,
            errors,
            setErrors,
            otpSend,
            setOtpSend,
            loading,
            setLoading,
            isDisabled,
            setIsDisabled,
            isHidePass,
            setIsHidePass,
            handleChange,
            handleSubmit,
            handleVerifyOtp,
            validate
        }}>
            {children}
        </signupContext.Provider>
    );
};

export default function useSignup() {
    const context = useContext(signupContext);
    if (!context) {
        console.log("Signup context is not found");
        return;
    }
    return context;
}

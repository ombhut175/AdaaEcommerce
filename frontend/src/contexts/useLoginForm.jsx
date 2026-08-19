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
    const [otp, setOtp] = useState('');

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


    const validateForm = (isForgot) => {
        if (!formData.email) {
            toast.error("Please enter your email");
            return false;
        }
        if (!isForgot && !formData.password) {
            toast.error("Please enter your password");
            return false;
        }
        setIsDisabled(true)
        return true;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };


    const handleForgot = async (e) => {
        e.preventDefault();

        validateForm(true);

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

    const handleVerifyForgotOtp = async (e) => {
        e.preventDefault();

        console.log(otp.length)
        if (!otp || otp.length !== 6) {
            setErrors({ otp: 'Please enter a valid 6-digit OTP.' });
            return;
        }

        setErrors({});

        const email = formData.email;

        try {
            const data = await authService.verifyForgotPasswordOtp({
                email,
                otp
            });

            if (data.success) {
                localStorage.setItem('authToken', data.token);
                toast(data.msg);
                setErrors({});
                navigate('/reset-password');
            } else {
                toast(data.msg);
                setErrors({ otp: data.msg || 'Error verifying OTP.' });
            }
        } catch (err) {
            console.error('Error verifying OTP:', err);
            const errorMessage = err.response?.data?.msg || 'Error verifying OTP.';
            toast(errorMessage);
            setErrors({ otp: errorMessage });
        } finally {
            setLoading(false);
            setIsDisabled(false);
        }
    };

    const handleSetNewPassword = async (e, resetFormData) => {
        if (e) e.preventDefault();

        const { newPassword, confirmPassword } = resetFormData || {};

        setIsDisabled(true);
        if (!newPassword || !confirmPassword) {
            setErrors({ resetPassword: 'Both fields are required.' });
            setIsDisabled(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrors({ resetPassword: 'Passwords do not match.' });
            setIsDisabled(false);
            return;
        }

        setErrors({});
        setLoading(true);

        const email = formData.email || localStorage.getItem('email');

        try {
            const data = await authService.resetPassword({
                email,
                newPassword: confirmPassword
            });

            if (data.success) {
                toast.success('Password changed successfully!');
                setErrors({});
                navigate('/');
            } else {
                toast.error(data.msg || 'An error occurred. Please try again.');
                setErrors({ resetPassword: data.msg || 'An error occurred. Please try again.' });
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            const errorMessage = err.response?.data?.msg || 'Failed to set new password. Please try again.';
            toast(errorMessage);
            setErrors({ resetPassword: errorMessage });
        } finally {
            setLoading(false);
            setIsDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
            isDisabled,
            setIsDisabled,
            handleChange,
            handleSubmit,
            handleForgot,
            handleVerifyForgotOtp,
            handleSetNewPassword,
            isHidePass,
            setErrors,
            setIsHidePass,
            formData,
            setFormData,
            otp,
            setOtp
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
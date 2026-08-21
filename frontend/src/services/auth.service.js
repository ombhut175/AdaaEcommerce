import api from './api';

/**
 * Service to handle authentication related API calls
 */
export const authService = {
    /**
     * Log in user with credentials
     * @param {Object} credentials - { email, password }
     */
    login: async (credentials) => {
        const response = await api.post('/api/login', credentials);
        return response.data;
    },

    /**
     * Send OTP for forgot password
     * @param {string} email
     */
    sendForgotPasswordOtp: async (email) => {
        const response = await api.post('/api/login/send-otp-forgot', { email });
        return response.data;
    },

    /**
     * Verify OTP for forgot password
     * @param {Object} data - { email, otp }
     */
    verifyForgotPasswordOtp: async (data) => {
        const response = await api.post('/api/login/verify-otp-forgot', data);
        return response.data;
    },

    /**
     * Verify OTP or reset password
     * @param {Object} data
     */
    resetPassword: async (data) => {
        const response = await api.post('/api/login/set-new-password', data);
        return response.data;
    },

    /**
     * Send OTP for signup
     * @param {Object} userData - { name, email, password }
     */
    sendSignupOtp: async (userData) => {
        const response = await api.post('/api/signup/send-otp', userData);
        return response.data;
    },

    /**
     * Verify OTP for signup
     * @param {Object} data - { email, otp }
     */
    verifySignupOtp: async (data) => {
        const response = await api.post('/api/signup/verify-otp', data);
        return response.data;
    }
};

export default authService;

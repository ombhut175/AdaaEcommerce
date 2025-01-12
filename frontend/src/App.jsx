import {  Routes, Route } from 'react-router-dom';

// Pages
import Signup from './pages/authentication/Signup.jsx';
import Login from './pages/authentication/Login';
import OTPVerification from './pages/authentication/OTPVerification.jsx'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx';
import OTPForForgot from './pages/authentication/OTPForForgot.jsx';
import SetNewPass from './pages/authentication/SetNewPass.jsx';
function App() {
    return (
            <Routes>
                {/* Public Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<OTPVerification />} />
                <Route path="/verify-otp-forgot" element={<OTPForForgot />} />
                <Route path="/set-new-password" element={<SetNewPass />} />
                

                {/* Protected Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
    );
}

export default App;

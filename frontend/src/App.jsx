import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import HomePage from "./pages/Home.jsx";
import BlogGridView from "./pages/BlogGridView.jsx";
import OTPVerification from "./pages/OTPVerification.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import {ToastContainer} from 'react-toastify'
import OTPForForgot from './pages/OTPForForgot.jsx'
import SetNewPass from "./pages/SetNewPass.jsx";

export default function App(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify-otp-forgot" element={<OTPForForgot />} />
                    <Route path="/set-new-password" element={<SetNewPass />} />
                    <Route path="/verify" element={<OTPVerification />} />
                    <Route path="/" element={<PrivateRouter Component={<Layout />}/>}>
                        <Route path="home" element={<PrivateRouter Component={<HomePage />}/>} />
                        <Route path="bloggridview" element={<PrivateRouter Component={<BlogGridView/>}/>} />
                    </Route>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        </>
    )
}
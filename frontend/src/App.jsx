import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Layout from "../Layout.jsx";
import HomePage from "./pages/Home.jsx";
import BlogGridView from "./pages/BlogGridView.jsx";
import OTPVerification from "./pages/OTPVerification.jsx";

export default function App(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify" element={<OTPVerification />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="home" element={<HomePage />} />
                        <Route path="bloggridview" element={<BlogGridView />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
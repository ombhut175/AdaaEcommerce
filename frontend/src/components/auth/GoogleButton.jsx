<<<<<<< HEAD
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUser, logInUser } from "../../store/features/userSlice.js";
import { LoadingBar } from "../loadingBar/LoadingBar.jsx";
import { useState } from "react";

const provider = new GoogleAuthProvider();
export function GoogleButton() {
  // function handleSignIn(){
  //     window.location.href=import.meta.env.VITE_BACKEND_URL + '/api/google';
  // }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // 1️⃣ Google Sign-In
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2️⃣ Get Firebase ID Token
      const idToken = await user.getIdToken();
      console.log(idToken);

      // 3️⃣ Call Backend API
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/google-auth",
        { token: idToken },
        {
          withCredentials: true, // important if using cookies
        }
      );

      // ✅ FIX: axios wraps response in .data
      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.msg);
        // Cookie is already set by the backend, no need to call setUserCookies
        dispatch(fetchUser());
        dispatch(logInUser());
        navigate('/');
      } else {
        setLoading(false);
        toast.error(response.data.msg);
      }

    } catch (error) {
      setLoading(false);
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };


  return (
    <>
      <LoadingBar isLoading={loading} />
      <button
        className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md"
        onClick={handleGoogleLogin}
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        <span className="text-sm text-gray-700 dark:text-gray-200">Sign up with Google</span>
      </button>
    </>
  )
=======
export function GoogleButton() {
    function handleSignIn(){
        window.location.href=import.meta.env.VITE_BACKEND_URL + '/api/google';
    }


    return (
        <>
            <button
                className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md"
                onClick={handleSignIn}
            >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5"/>
                <span className="text-sm text-gray-700 dark:text-gray-200">Sign up with Google</span>
            </button>
        </>
    )
>>>>>>> origin
}
import { Link,useNavigate } from 'react-router-dom'
import {GoogleButton} from "./GoogleButton.jsx";
import {LoadingBar} from "../loadingBar/LoadingBar.jsx";
import useLoginForm from '../../contexts/useLoginForm.jsx';
import FormInput from '../common/FormInput.jsx';

function SignIn() {
  const { 
    errors, 
    loading, 
    handleChange, 
    handleSubmit, 
    handleForgot, 
    isHidePass, 
    setIsHidePass 
  } = useLoginForm();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
        <LoadingBar isLoading={loading} />
      <div className="flex-1 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In To ADAA</h2>
          </div>

          <div className="flex gap-4 mb-6">
            <GoogleButton />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            <div className="space-y-4">
              <FormInput 
              type="email"
              placeholder="Email"
              name='email'
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
              onChange={handleChange}
              errors={errors}
              isHidePass={isHidePass}
              setIsHidePass={setIsHidePass}
              />
              
            <FormInput 
              type="password"
              placeholder="Password"
              name="password"
              className="relative w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
              onChange={handleChange}
              errors={errors}
              isHidePass={isHidePass}
              setIsHidePass={setIsHidePass}
              />

            </div>

              <button
                  type="submit"
                  className={`w-full p-3 rounded-lg transition-all duration-200 transform ${
                      loading
                          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  disabled={loading}
              >
                  Sign In
              </button>


              <div className="flex items-center justify-between text-sm">
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              >
                Register Now
              </Link>
              <button
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                onClick={handleForgot}
              >
                Forgot Password?
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            By continuing, you agree to ADAA&apos;s{' '}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
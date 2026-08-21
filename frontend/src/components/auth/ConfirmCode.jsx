import { Link } from 'react-router-dom';
import { LoadingBar } from "../loadingBar/LoadingBar.jsx";
import useSignup from '../../contexts/useSignup.jsx';

function ConfirmCode() {
    const {
        setOtp,
        errors,
        loading,
        isDisabled,
        handleVerifyOtp
    } = useSignup();

    const errorMessage = typeof errors === 'string' ? errors : errors?.otp;

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <LoadingBar isLoading={loading || isDisabled}/>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8 animate-fadeIn">
                    <div className="text-center transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-orange-400 mb-2 animate-scaleIn">
                            Enter The Confirmation Code
                        </h2>
                        <p className="text-gray-600 dark:text-teal-300 animate-slideIn"
                           style={{animationDelay: '0.2s'}}>
                            We've sent a confirmation code to your email address.
                        </p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <input
                                type="text"
                                placeholder="Confirmation Code"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:border-teal-600 dark:bg-gray-800 dark:text-orange-300 dark:placeholder-teal-400 transition-all duration-300"
                                name="otp"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            {errorMessage && <span className='text-red-700'>{errorMessage}</span>}
                        </div>

                        <button
                            type="submit"
                            
                            className={`w-full p-4 rounded-lg transition-all duration-300 transform ${
                                isDisabled || loading
                                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                    : "bg-gray-900 dark:bg-orange-500 text-white hover:bg-gray-800 dark:hover:bg-orange-400 hover:scale-105 hover:shadow-lg active:scale-95"
                            }`}
                            disabled={isDisabled || loading}
                        >
                            Go
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 dark:text-teal-300 animate-fadeIn"
                       style={{animationDelay: '0.6s'}}>
                        By continuing, you agree to ADAA's{' '}
                        <Link to="/terms"
                              className="text-gray-900 dark:text-orange-400 hover:text-gray-700 dark:hover:text-orange-300 transition-all duration-300">
                            Terms & Conditions
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConfirmCode;
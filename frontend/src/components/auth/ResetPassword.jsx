import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingBar } from "../loadingBar/LoadingBar.jsx";
import useLoginForm from '../../contexts/useLoginForm.jsx';

function ResetPassword() {
  const [resetFormData, setResetFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const {
    errors,
    loading,
    isDisabled,
    handleSetNewPassword
  } = useLoginForm();

  const errorMessage = typeof errors === 'string' ? errors : errors?.resetPassword;

  const handleSubmit = (e) => {
    handleSetNewPassword(e, resetFormData);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <LoadingBar isLoading={loading || isDisabled} />

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Enter Your New Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
                value={resetFormData.newPassword}
                onChange={(e) => setResetFormData({ ...resetFormData, newPassword: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
                value={resetFormData.confirmPassword}
                onChange={(e) => setResetFormData({ ...resetFormData, confirmPassword: e.target.value })}
              />
            </div>
            {errorMessage && <span className='text-red-700'>{errorMessage}</span>}
            <button
              type="submit"
              className={`w-full p-3 rounded-lg transition-all duration-200 transform ${
                isDisabled || loading
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
              }`}
              disabled={isDisabled || loading}
            >
              Submit
            </button>
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
  );
}

export default ResetPassword;
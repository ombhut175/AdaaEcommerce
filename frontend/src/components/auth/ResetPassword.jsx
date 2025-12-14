import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {LoadingBar} from "../loadingBar/LoadingBar.jsx";
function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

      setIsDisabled(true);
    if (!formData.newPassword || !formData.confirmPassword) {
      setErrors('Both fields are required.');
      return;
  }

  if (formData.newPassword !== formData.confirmPassword) {
      setErrors('Passwords do not match.');
      return;
  }

  setErrors('');

  const email = localStorage.getItem('email'); // Retrieve email from localStorage

  fetch(import.meta.env.VITE_BACKEND_URL + '/api/login/set-new-password', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword: formData.confirmPassword }),
  })
      .then((res) => res.json())
      .then((data) => {
          if (data.success) {
              toast.success('Password changed successfully!');
              navigate('/'); // Redirect to home page after success
          } else {
              setErrors(data.msg || 'An error occurred. Please try again.');
          }
      })
      .catch((err) => {
          console.log(err);
          setErrors('Failed to set new password. Please try again.');
      })
      .finally(() => setIsDisabled(false));
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
        <LoadingBar isLoading={isDisabled} />
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Enter Your New Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
              <input
                type="text"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-200"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            {errors && <span className='text-red-700'>{errors}</span>}
              <button
                  type="submit"
                  className={`w-full p-3 rounded-lg transition-all duration-200 transform ${
                      isDisabled
                          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  disabled={isDisabled}
              >
                  Submit
              </button>

          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            By continuing, you agree to ADAA's{' '}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
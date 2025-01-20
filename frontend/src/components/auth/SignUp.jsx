import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle sign up logic
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="flex-1 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&h=1200&fit=crop"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-scaleIn">
              Create Account
            </h2>
          </div>

          <div className="flex gap-4 mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <button className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span className="text-sm text-gray-700 dark:text-gray-200">Sign up with Google</span>
            </button>
          </div>

          <div className="relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4">
              <div className="transform hover:scale-105 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Create Account
            </button>

            <p className="text-center text-sm animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all duration-300 hover:scale-110 inline-block"
              >
                Login
              </Link>
            </p>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            By continuing, you agree to FASCO's{' '}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all duration-300">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
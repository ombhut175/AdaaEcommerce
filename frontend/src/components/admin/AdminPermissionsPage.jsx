import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import ThemeToggle from "../components/ThemeToggle"

const AdminPermissionsPage = () => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [formData, setFormData] = useState({
        userEmail: "",
        permission: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.put("/api/admin/givePermissions", {
                userEmail: formData.userEmail,
                permission: formData.permission,
            })

            toast.success("Permissions updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setFormData({ userEmail: "", permission: "" })
        } catch (error) {
            toast.error("Failed to update permissions", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div
            className={`
        min-h-screen transition-colors duration-300 pt-36 ease-in-out
        ${darkMode ? "bg-[#111827] text-white" : "bg-[#FFFFFF] text-gray-900"}
      `}
        >
            {/*<ThemeToggle />*/}

            <div className="max-w-md mx-auto p-6">
                <div
                    className={`
            rounded-lg p-8 shadow-lg transition-all duration-300 ease-in-out
            ${darkMode ? "bg-gray-800 shadow-gray-900/50" : "bg-white shadow-gray-200/50"}
          `}
                >
                    <button
                        onClick={() => window.history.back()}
                        className={`
              mb-6 px-4 py-2 rounded-lg flex items-center gap-2
              transition-all duration-200 ease-in-out transform hover:scale-105
              ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}
            `}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>

                    <h1 className="text-3xl font-bold mb-8 transition-colors duration-300">Manage Permissions</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium transition-colors duration-300">Email Address</label>
                            <input
                                type="email"
                                name="userEmail"
                                value={formData.userEmail}
                                onChange={handleChange}
                                required
                                className={`
                  w-full p-3 rounded-lg border transition-all duration-200 ease-in-out
                  focus:ring-2 focus:outline-none
                  ${
                                    darkMode
                                        ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-white"
                                        : "bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-900"
                                }
                `}
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium transition-colors duration-300">Permission Level</label>
                            <select
                                name="permission"
                                value={formData.permission}
                                onChange={handleChange}
                                required
                                className={`
                  w-full p-3 rounded-lg border transition-all duration-200 ease-in-out
                  focus:ring-2 focus:outline-none appearance-none
                  ${
                                    darkMode
                                        ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-white"
                                        : "bg-gray-50 border-gray-200 focus:ring-blue-500 text-gray-900"
                                }
                `}
                            >
                                <option value="">Select permission level</option>
                                <option value="dealer">Dealer</option>
                                <option value="Delivery Boy">Delivery Boy</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                w-full py-3 px-4 rounded-lg font-medium
                transition-all duration-200 ease-in-out
                transform hover:scale-105 hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                bg-blue-600 hover:bg-blue-700 text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${darkMode ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"}
              `}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminPermissionsPage


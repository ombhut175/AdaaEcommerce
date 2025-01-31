    import {motion} from 'framer-motion';
    import {useState, useRef} from 'react';
    import {FaCamera, FaLock} from 'react-icons/fa';
    import {useDispatch, useSelector} from "react-redux";
    import axios from "axios";
    import {useNavigate} from "react-router-dom";
    import {changeName, editUser, setProfilePicture} from "../../store/features/userSlice.js";
    import {toast} from 'react-toastify'
    export default function EditProfile() {
        const user = useSelector((state) => state.user);
        const [formData, setFormData] = useState({
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
        });

        const fileInputRef = useRef(null);
        const [image, setImage] = useState(null);
        const [previewImage, setPreviewImage] = useState(formData.profilePicture);
        const [showPasswordModal, setShowPasswordModal] = useState(false);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        const handleImageClick = () => {
            fileInputRef.current.click();
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            setImage(file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const formPayload = new FormData();
                if (image) {
                    formPayload.append('profilePicture',image);
                }
                formPayload.append('name', formData.name);
                formPayload.append('profilePictureUrl', formData.profilePicture);

                const response = await axios.put(
                    `${BACKEND_URL}/api/user/editProfile`,
                    formPayload,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true // Include cookies if using cookie-based auth
                    }
                );

                if (response.status === 200) {
                    dispatch(editUser({
                        name: formData.name,
                        profilePicture: response.data.profilePicture,
                    }));
                    navigate('/profile');
                }

            } catch (error) {
                console.error(error);
            }
        };

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const [passwordData, setPasswordData] = useState({
            // oldPassword: "",
            newPass: "",
            confirmPass: "",
        });
        
        const handleInputChange = (e) => {
            console.log(passwordData);
            
            setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
        };

        // Strong Password Validation Function
        const isValidPassword = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            return passwordRegex.test(password);
        };

        const handleFormSubmit = (e) => {
            e.preventDefault();
            console.log(passwordData);
            
            if (!passwordData.newPass || !passwordData.confirmPass) {
                toast.error("All fields are required.");
                return;
            }

            if (!isValidPassword(passwordData.newPass)) {
                toast.error("Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one special character, and one number.");
                return;
            }

            if (passwordData.newPass !== passwordData.confirmPass) {
                toast.error("New passwords do not match.");
                return;
            }

            const updatedPassword = {
                updated: passwordData.newPass,
            };

            axios
                .post(
                    `${BACKEND_URL}/api/login/set-new-password`,
                    { email: user.email, newPassword: updatedPassword.updated },
                    { withCredentials: true }
                )
                .then((res) => {
                    const data = res.data;
                    if (data.success) {
                        toast.success("Password changed successfully!");
                        navigate("/"); // Redirect to home page after success
                    } else {
                        setErrors(data.msg || "An error occurred. Please try again.");
                    }
                })
                .catch(() => {
                    setErrors("Failed to set new password. Please try again.");
                });
        }

        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
            >
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
                    >
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                Edit Profile
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Profile Picture */}
                                <div className="flex justify-center">
                                    <motion.div
                                        whileHover={{scale: 1.05}}
                                        className="relative w-32 h-32 cursor-pointer"
                                        onClick={handleImageClick}
                                    >
                                        <img
                                            src={previewImage}
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <FaCamera className="text-white text-2xl"/>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </motion.div>
                                </div>

                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <motion.input
                                        whileFocus={{scale: 1.02}}
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                        required
                                    />
                                </div>

                                {/* Email Input (Disabled) */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        disabled
                                    />
                                </div>

                                {/* Change Password Button */}
                                <motion.button
                                    type="button"
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    onClick={() => setShowPasswordModal(true)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                                >
                                    <FaLock/>
                                    Change Password
                                </motion.button>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-300"
                                >
                                    Save Changes
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* Password Change Modal */}
                {showPasswordModal && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md m-4"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Change Password
                            </h2>
                            <form className="space-y-4" onSubmit={handleFormSubmit}>
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        onChange={handleInputChange}
                                        type="password"
                                        name='newPass'
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name='confirmPass'
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <motion.button
                                        type="button"
                                        whileHover={{scale: 1.02}}
                                        whileTap={{scale: 0.98}}
                                        onClick={() => setShowPasswordModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{scale: 1.02}}
                                        whileTap={{scale: 0.98}}
                                        className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium"
                                    >
                                        Update Password
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        );
    }
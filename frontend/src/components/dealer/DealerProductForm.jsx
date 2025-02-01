import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {FaUpload, FaTimes} from 'react-icons/fa';
import axios from "axios";
import {toast} from "react-toastify";
import {LoadingBar} from "../loadingBar/LoadingBar.jsx";

const inputVariants = {
    focus: {scale: 1.02, transition: {type: "spring", stiffness: 300}},
    tap: {scale: 0.98}
};

const colors = [
    {name: "Red", value: "#FF0000"},
    {name: "Green", value: "#00FF00"},
    {name: "Blue", value: "#0000FF"},
    {name: "Yellow", value: "#FFFF00"},
    {name: "Black", value: "#000000"}
];

export default function DealerProductForm() {
    const {id} = useParams();
    const isEditing = Boolean(id);
    const [isDisabled, setIsDisabled] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [colorImages, setColorImages] = useState({});
    const initialFormState = {
        name: '',
        title: '',
        description: '',
        brand: '',
        price: '',
        discount: '',
        stock: '',
        selectedColor: ''
    }

    const [formData, setFormData] = useState(initialFormState);

    const navigate = useNavigate();




    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const color = formData.selectedColor;

        if (!color) {
            alert('Please select a color first');
            return;
        }

        if (files.length + Object.keys(colorImages[color]?.previews || {}).length > 10) {
            alert('Maximum 10 images allowed per color');
            return;
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setColorImages(prev => ({
            ...prev,
            [color]: {
                files: {
                    ...(prev[color]?.files || {}),
                    [Object.keys(prev[color]?.files || {}).length]: newImages[0].file
                },
                previews: {
                    ...(prev[color]?.previews || {}),
                    [Object.keys(prev[color]?.previews || {}).length]: newImages[0].preview
                }
            }
        }));
    };

    const removeImage = (color, index) => {
        if (colorImages[color]?.previews[index]) {
            URL.revokeObjectURL(colorImages[color].previews[index]);

            setColorImages(prev => {
                const newColorImages = {...prev};
                const {files, previews} = newColorImages[color];

                delete files[index];
                delete previews[index];

                return {
                    ...newColorImages,
                    [color]: {files, previews}
                };
            });
        }
    };

    // Update handleSubmit function in DealerProductForm.jsx
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsDisabled(true);
        // Check if any colors with images exist
        const validColors = Object.entries(colorImages).filter(
            ([colorValue, data]) => Object.keys(data?.files || {}).length > 0
        );

        if (validColors.length === 0) {
            alert("Please add at least one color with images");
            return;
        }

        const formPayload = new FormData();
        const colorNames = [];
        const colorValues = [];

        // Process all colors with images
        validColors.forEach(([colorValue, colorData]) => {
            const color = colors.find(c => c.value === colorValue);
            if (color) {
                colorNames.push(color.name);
                colorValues.push(colorValue);

                // Append files with color name as field name
                Object.values(colorData.files).forEach(file => {
                    formPayload.append(color.name, file);
                });
            }
        });

        // Add color metadata
        formPayload.append("colorNames", JSON.stringify(colorNames));
        formPayload.append("colorValues", JSON.stringify(colorValues));

        // Add other form fields
        formPayload.append("name", formData.name);
        formPayload.append("title", formData.title);
        formPayload.append("description", formData.description);
        formPayload.append("price", formData.price);
        formPayload.append("discount", formData.discount);
        formPayload.append("stock", formData.stock);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/dealer/add`,
                formPayload,
                { withCredentials: true }
            );

            if (response.status === 201) {
                // Reset form
                toast.success("new product added successfully");
                setColorImages({});
                setFormData(initialFormState);
                navigate('/dealer/products');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error uploading product. Please try again.");
        } finally {
            setIsDisabled(false);
        }
    };

    const currentColorImages = formData.selectedColor ?
        colorImages[formData.selectedColor]?.previews || {} : {};

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
        >
            <LoadingBar isLoading={isDisabled} />
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400 mt-2">
                            <Link to="/dealer/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                My Products
                            </Link>
                            <span className="mx-2">/</span>
                            <span>{isEditing ? 'Edit Product' : 'New Product'}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            variants={inputVariants}
                            whileFocus="focus"
                            whileTap="tap"
                            className="space-y-2"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div
                            variants={inputVariants}
                            whileFocus="focus"
                            whileTap="tap"
                            className="space-y-2"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        variants={inputVariants}
                        whileFocus="focus"
                        whileTap="tap"
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            required
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            variants={inputVariants}
                            whileFocus="focus"
                            whileTap="tap"
                            className="space-y-2"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Brand
                            </label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData(prev => ({...prev, brand: e.target.value}))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div
                            variants={inputVariants}
                            whileFocus="focus"
                            whileTap="tap"
                            className="space-y-2"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Price
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                                min="0"
                                step="0.01"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div
                            variants={inputVariants}
                            whileFocus="focus"
                            whileTap="tap"
                            className="space-y-2"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => setFormData(prev => ({...prev, discount: e.target.value}))}
                                min="0"
                                max="100"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div
                            variants={inputVariants}
                            whileFocus="focus"
                            whileTap="tap"
                            className="space-y-2"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData(prev => ({...prev, stock: e.target.value}))}
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        variants={inputVariants}
                        whileFocus="focus"
                        whileTap="tap"
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Select Color
                        </label>
                        <select
                            value={formData.selectedColor}
                            onChange={(e) => setFormData(prev => ({...prev, selectedColor: e.target.value}))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                            <option value="">Choose a color</option>
                            {colors.map((color) => (
                                <option key={color.value} value={color.value}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </motion.div>

                    {formData.selectedColor && (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Images for {colors.find(c => c.value === formData.selectedColor)?.name} (Max 10)
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {Object.entries(currentColorImages).map(([index, preview]) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}}
                                        className="relative aspect-square"
                                    >
                                        <img
                                            src={preview}
                                            alt={`Preview ${parseInt(index) + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <motion.button
                                            whileHover={{scale: 1.1}}
                                            whileTap={{scale: 0.9}}
                                            type="button"
                                            onClick={() => removeImage(formData.selectedColor, index)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                        >
                                            <FaTimes size={12}/>
                                        </motion.button>
                                    </motion.div>
                                ))}

                                {Object.keys(currentColorImages).length < 10 && (
                                    <motion.label
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400"
                                    >
                                        <FaUpload className="text-gray-400 mb-2" size={24}/>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                      Upload Image
                    </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </motion.label>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-4">
                        <Link to="/dealer/products">
                            <motion.button
                                type="button"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </motion.button>
                        </Link>
                        <motion.button
                            type="submit"
                            whileHover={!isDisabled ? { scale: 1.05 } : {}}
                            whileTap={!isDisabled ? { scale: 0.95 } : {}}
                            className={`px-6 py-2 rounded-md ${
                                isDisabled
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' // Disabled state styles
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700' // Active state styles
                            }`}
                            disabled={isDisabled}
                            onClick={handleSubmit}
                        >
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </motion.button>

                    </div>
                </form>
            </div>
        </motion.div>
    );
}
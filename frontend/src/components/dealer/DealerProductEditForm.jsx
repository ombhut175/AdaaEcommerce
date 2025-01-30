import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {FaUpload, FaTimes} from 'react-icons/fa';
import axios from "axios";
import {toast} from "react-toastify";

const inputVariants = {
    focus: {scale: 1.02, transition: {type: "spring", stiffness: 300}},
    tap: {scale: 0.98}
};

const defaultColors = [
    {name: "Red", value: "#FF0000"},
    {name: "Green", value: "#00FF00"},
    {name: "Blue", value: "#0000FF"},
    {name: "Yellow", value: "#FFFF00"},
    {name: "Black", value: "#000000"}
];

export default function DealerProductEditingPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        price: '',
        discountPercent: '',
        stock: '',
        colors: [],
        features: [''],
        warrantyDetails: ''
    });

    const [selectedColor, setSelectedColor] = useState({name: '', value: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/products/${id}`, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    const product = response.data;
                    setFormData({
                        ...product,
                        colors: product.colors.map(color => ({
                            ...color,
                            images: color.images.map(img => ({url: img, file: null}))
                        }))
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to fetch product details");
            }
        };

        if (id) fetchProduct();
    }, [id, BACKEND_URL]);

    const handleAddColor = () => {
        if (!selectedColor.name) return;

        const colorExists = formData.colors.some(c => c.colorName === selectedColor.name);
        if (colorExists) {
            toast.warning("This color already exists");
            return;
        }

        setFormData(prev => ({
            ...prev,
            colors: [...prev.colors, {
                colorName: selectedColor.name,
                colorValue: selectedColor.value,
                images: []
            }]
        }));
        setSelectedColor({name: '', value: ''});
    };

    const handleRemoveColor = (colorIndex) => {
        setFormData(prev => ({
            ...prev,
            colors: prev.colors.filter((_, index) => index !== colorIndex)
        }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({...prev, features: newFeatures}));
    };

    const handleAddFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const handleRemoveFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSend = new FormData();

        // Inside handleSubmit function
        const existingImagesByColor = formData.colors.map(color => ({
            colorName: color.colorName,
            existingUrls: color.images.filter(img => !img.file).map(img => img.url)
        }));
        formDataToSend.append('existingImagesByColor', JSON.stringify(existingImagesByColor));

        // Basic fields
        formDataToSend.append('name', formData.name);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('discount', formData.discountPercent);
        formDataToSend.append('stock', formData.stock);

        if (id) formDataToSend.append('productId', id);

        // Color data
        const colorNames = formData.colors.map(c => c.colorName);
        const colorValues = formData.colors.map(c => c.colorValue);
        formDataToSend.append('colorNames', JSON.stringify(colorNames));
        formDataToSend.append('colorValues', JSON.stringify(colorValues));

        // Image files
        formData.colors.forEach(color => {
            color.images.forEach(image => {
                if (image.file instanceof File) {
                    formDataToSend.append(color.colorName, image.file);
                }
            });
        });

        try {
            const response = await axios.put(
                `${BACKEND_URL}/api/dealer/updateProduct`,
                formDataToSend,
                {
                    headers: {'Content-Type': 'multipart/form-data'},
                    withCredentials: true,
                }
            );

            if ([200, 201].includes(response.status)) {
                toast.success(id ? "Product updated successfully!" : "Product created successfully!");
                navigate('/dealer/products');
            }
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error(error.response?.data?.message || "Operation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
        >
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            {id ? 'Edit Product' : 'Create New Product'}
                        </h1>
                        <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400 mt-2">
                            <Link to="/dealer/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                My Products
                            </Link>
                            <span className="mx-2">/</span>
                            <span>{id ? 'Edit' : 'Create'}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={inputVariants} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div variants={inputVariants} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Title *
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

                    {/* Description */}
                    <motion.div variants={inputVariants} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            required
                        />
                    </motion.div>

                    {/* Pricing Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div variants={inputVariants} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Price (INR) *
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div variants={inputVariants} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                value={formData.discountPercent}
                                onChange={(e) => setFormData(prev => ({...prev, discountPercent: e.target.value}))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </motion.div>

                        <motion.div variants={inputVariants} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Stock Quantity *
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData(prev => ({...prev, stock: e.target.value}))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                required
                            />
                        </motion.div>
                    </div>

                    {/* Color Management */}
                    <div className="space-y-4">
                        <div className="flex gap-4 items-end">
                            <motion.div variants={inputVariants} className="flex-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Select Color *
                                </label>
                                <select
                                    value={selectedColor.name}
                                    onChange={(e) => {
                                        const color = defaultColors.find(c => c.name === e.target.value);
                                        setSelectedColor(color || {name: '', value: ''});
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                >
                                    <option value="">Choose a color</option>
                                    {defaultColors.map(color => (
                                        <option key={color.name} value={color.name}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>
                            <motion.button
                                type="button"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={handleAddColor}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add Color
                            </motion.button>
                        </div>

                        {formData.colors.map((color, colorIndex) => (
                            <motion.div
                                key={colorIndex}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full border"
                                            style={{backgroundColor: color.colorValue}}
                                        />
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            {color.colorName}
                                        </h3>
                                    </div>
                                    <motion.button
                                        type="button"
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        onClick={() => handleRemoveColor(colorIndex)}
                                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"
                                    >
                                        <FaTimes/>
                                    </motion.button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {color.images.map((image, imageIndex) => {
                                        const imageUrl = image.file ? URL.createObjectURL(image.file) : image.url;
                                        return (
                                            <motion.label
                                                key={imageIndex}
                                                initial={{opacity: 0, scale: 0.8}}
                                                animate={{opacity: 1, scale: 1}}
                                                className="relative aspect-square group cursor-pointer"
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt={`${color.colorName} view ${imageIndex + 1}`}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setFormData(prev => {
                                                                const newColors = [...prev.colors];
                                                                const updatedImage = {
                                                                    url: URL.createObjectURL(file),
                                                                    file: file
                                                                };
                                                                const updatedImages = [...newColors[colorIndex].images];
                                                                updatedImages[imageIndex] = updatedImage;
                                                                const updatedColor = {
                                                                    ...newColors[colorIndex],
                                                                    images: updatedImages
                                                                };
                                                                newColors[colorIndex] = updatedColor;
                                                                return {...prev, colors: newColors};
                                                            });
                                                        }
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormData(prev => {
                                                            const newColors = [...prev.colors];
                                                            const updatedImages = [...newColors[colorIndex].images];
                                                            updatedImages.splice(imageIndex, 1);
                                                            const updatedColor = {
                                                                ...newColors[colorIndex],
                                                                images: updatedImages
                                                            };
                                                            newColors[colorIndex] = updatedColor;
                                                            return {...prev, colors: newColors};
                                                        });
                                                    }}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTimes className="w-3 h-3"/>
                                                </button>
                                            </motion.label>
                                        );
                                    })}
                                    <motion.label
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400"
                                    >
                                        <FaUpload className="text-gray-400 mb-2" size={24}/>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
        Add Images
    </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files).map(file => ({
                                                    url: URL.createObjectURL(file),
                                                    file
                                                }));
                                                setFormData(prev => {
                                                    const newColors = [...prev.colors];
                                                    const updatedColor = {
                                                        ...newColors[colorIndex],
                                                        images: [...newColors[colorIndex].images, ...files]
                                                    };
                                                    newColors[colorIndex] = updatedColor;
                                                    return {...prev, colors: newColors};
                                                });
                                            }}
                                        />
                                    </motion.label>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Product Features */}
                    <motion.div variants={inputVariants} className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Features
                            </label>
                            <motion.button
                                type="button"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={handleAddFeature}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add Feature
                            </motion.button>
                        </div>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    placeholder="Enter feature"
                                />
                                <motion.button
                                    type="button"
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={() => handleRemoveFeature(index)}
                                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"
                                >
                                    <FaTimes/>
                                </motion.button>
                            </div>
                        ))}
                    </motion.div>

                    {/* Warranty Details */}
                    <motion.div variants={inputVariants} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Warranty Details
                        </label>
                        <textarea
                            value={formData.warrantyDetails}
                            onChange={(e) => setFormData(prev => ({...prev, warrantyDetails: e.target.value}))}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                    </motion.div>

                    {/* Submit Button */}
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
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : (id ? 'Update Product' : 'Create Product')}
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
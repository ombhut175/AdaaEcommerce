import { useState } from "react";
import axios from "axios";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const Testing = () => {
    const [colorImages, setColorImages] = useState({});
    const [data, setData] = useState({
        name: "",
        title: "",
        description: "",
        price: "",
        color: "",
    });
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file && data.color) {
            const previewUrl = URL.createObjectURL(file);

            setColorImages(prev => ({
                ...prev,
                [data.color]: {
                    ...prev[data.color],
                    files: {
                        ...(prev[data.color]?.files || {}),
                        [index]: file
                    },
                    previews: {
                        ...(prev[data.color]?.previews || {}),
                        [index]: previewUrl
                    }
                }
            }));
        }
    };

    const removeImage = (index) => {
        if (data.color && colorImages[data.color]?.previews[index]) {
            URL.revokeObjectURL(colorImages[data.color].previews[index]);

            setColorImages(prev => {
                const newColorImages = { ...prev };
                const { files, previews } = newColorImages[data.color];

                delete files[index];
                delete previews[index];

                return {
                    ...newColorImages,
                    [data.color]: { files, previews }
                };
            });
        }
    };

    const handleColorChange = (e) => {
        setData(prev => ({ ...prev, color: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!data.color || !colorImages[data.color]) {
            alert("Please select a color and upload images");
            return;
        }

        const formData = new FormData();

        // Append files for the selected color
        Object.values(colorImages[data.color].files).forEach((file) => {
            if (file) {
                formData.append("files", file);
            }
        });

        formData.append("name", data.name);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("color", data.color);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/products/add`, formData, { withCredentials: true });
            if (response.status === 200) {
                alert("Product added successfully!");
                // Clear form
                setColorImages({});
                setData({
                    name: "",
                    title: "",
                    description: "",
                    price: "",
                    color: "",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error uploading product. Please try again.");
        }
    };

    const colors = [
        { name: "Red", value: "#FF0000" },
        { name: "Green", value: "#00FF00" },
        { name: "Blue", value: "#0000FF" },
        { name: "Yellow", value: "#FFFF00" },
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
    ];

    const currentColorImages = data.color ? colorImages[data.color]?.previews || {} : {};

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-white">Add New Product</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white">Product Name</label>
                            <input
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Description</label>
                            <textarea
                                value={data.description}
                                rows={3}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Price</label>
                            <input
                                type="number"
                                value={data.price}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Color</label>
                            <select
                                value={data.color}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                onChange={handleColorChange}
                            >
                                <option value="">Select a color</option>
                                {colors.map((color, index) => (
                                    <option key={index} value={color.value} className="text-white bg-gray-700">
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {data.color && (
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Product Images for {colors.find(c => c.value === data.color)?.name}
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {Array(10).fill(null).map((_, index) => (
                                        <div key={index} className="relative">
                                            {currentColorImages[index] ? (
                                                <div className="relative group">
                                                    <img
                                                        src={currentColorImages[index]}
                                                        alt={`Preview ${index + 1}`}
                                                        className="h-32 w-full object-cover rounded-lg"
                                                    />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                                        <p className="text-xs text-gray-400 mt-2">Image {index + 1}</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, index)}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleSubmit}
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testing;
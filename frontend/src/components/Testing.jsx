import {useEffect, useState} from "react";
import axios from "axios";

const Testing = () => {
    const [files, setFiles] = useState([]);
    const [data,setData] = useState({
        name:'',
        title:'',
        description:'',
        price:'',
    });
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleFileChange = (e, index) => {
        const updatedFiles = [...files];
        updatedFiles[index] = e.target.files[0]; // Update the file at the specific index
        setFiles(updatedFiles);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Append the array of files under a single key
        files.forEach((file) => {
            if (file) {
                formData.append("files", file); // Key "files" will hold the array of files
            }
        });

        // Append other data
        formData.append("name", data.name);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);


        try {
            const response = await axios.post(`${BACKEND_URL}/api/products/add`, formData, { withCredentials: true });
            console.log("after response:");
            if (response.status === 200) {
                console.log("Files uploaded successfully");
            } else {
                console.log("Error uploading files");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };



    return (
        <>
            {JSON.stringify(data)}
            <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name"
                onChange={(e)=> setData({...data,name: e.target.value})}
                required
            />
            <input
                type="email"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="title"
                onChange={(e)=> setData({...data,title: e.target.value})}
                required
            />
            <input
                type="email"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="description"
                onChange={(e)=> setData({...data,description: e.target.value})}
                required
            />
            <input
                type="email"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="price"
                onChange={(e)=> setData({...data,price: e.target.value})}
                required
            />
            {Array(5)
                .fill(false)
                .map((_, index) => (
                    <input
                        key={index}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id={`file_input_${index}`}
                        type="file"
                        onChange={(e) => handleFileChange(e, index)}
                    />
                ))}
            <button
                type="button"
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </>
    );
};

export default Testing;

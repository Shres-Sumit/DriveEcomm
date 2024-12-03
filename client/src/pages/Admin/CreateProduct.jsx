import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';

const CarForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        model: '',
        year: '',
        color: '',
        price: '',
        description: '',
    });
    const [auth] = useAuth()

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            // Check file type
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload only PNG, JPEG, or JPG images.');
                return;
            }

            // Store the file
            setImageFile(file);

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataForUpload = new FormData();

        Object.keys(formData).forEach(key => {
            formDataForUpload.append(key, formData[key]);
        });

        if (imageFile) {
            formDataForUpload.append('image', imageFile);
        }

        for (let [key, value] of formDataForUpload.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const { data } = await axios.post('/car/create-product', formDataForUpload, {
                headers: {
                    Authorization: auth?.token
                }
            })
            if (data?.success) {
                console.log(`car created`)
            }
        } catch (error) {
            console.log(error)
        }


    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Car Listing Form</h2>



            <form
                onSubmit={handleSubmit}
                className="space-y-4"
                encType="multipart/form-data"
            >
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter listing title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                    </label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter car model"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter manufacturing year"
                        min="1900"
                        max="2024"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                    </label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter car color"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter car description"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Car Image (PNG, JPEG, JPG only)
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept=".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg"
                            className="hidden"
                        />
                        <label
                            htmlFor="image"
                            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Choose Image
                        </label>
                        {imagePreview && (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleImageRemove}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                >
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                    >
                        Submit Listing
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CarForm;
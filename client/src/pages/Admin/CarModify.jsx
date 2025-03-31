import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Layout from '../../components/Layout';
import AdminLayout from './AdminLayout';


const CarModify = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [carData, setCarData] = useState({
        title: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        color: '',
        condition: '',
        class: '',
        description: '',
        fuelType: '',
        transmission: '',
        image: ''
    });

    // Fetch car data on component mount
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/car/${slug}`);
                setCarData(data.car);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch car details');
                setLoading(false);
                console.error(err);
            }
        };

        fetchCarDetails();
    }, [slug]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({
            ...carData,
            [name]: name === 'price' || name === 'year' || name === 'mileage' ? Number(value) : value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`/car/update/${carData._id}`, carData);
            setLoading(false);
            navigate('/admin/cars');
        } catch (err) {
            setError('Failed to update car');
            setLoading(false);
            console.error(err);
        }
    };

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoading(true);
            const { data } = await axios.post('/upload/image', formData);
            setCarData({
                ...carData,
                image: data.url
            });
            setLoading(false);
        } catch (err) {
            setError('Failed to upload image');
            setLoading(false);
            console.error(err);
        }
    };

    if (loading) {
        return (
            <Layout>
                <AdminLayout>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </AdminLayout>
            </Layout>
        );
    }
    return (
        <Layout>
            <AdminLayout>
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg shadow-md">
                        Edit Car: {carData.title}
                    </h2>

                    {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Car Details */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Brand</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={carData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={carData.model}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                                <input
                                    type="number"
                                    id="year"
                                    name="year"
                                    value={carData.year}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={carData.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage</label>
                                <input
                                    type="number"
                                    id="mileage"
                                    name="mileage"
                                    value={carData.mileage}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    value={carData.color}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                                <select
                                    id="condition"
                                    name="condition"
                                    value={carData.condition}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                >
                                    <option value="">Select condition</option>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                    <option value="Collector">Collector</option>
                                    <option value="Classic">Classic</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                                <input
                                    type="text"
                                    id="class"
                                    name="class"
                                    value={carData.class}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                />
                            </div>

                            <div>
                                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type</label>
                                <select
                                    id="fuelType"
                                    name="fuelType"
                                    value={carData.fuelType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                >
                                    <option value="">Select fuel type</option>
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
                                <select
                                    id="transmission"
                                    name="transmission"
                                    value={carData.transmission}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                    required
                                >
                                    <option value="">Select transmission</option>
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Semi-automatic">Semi-automatic</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={carData.description}
                                onChange={handleChange}
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                required
                            ></textarea>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Car Image</label>
                            <div className="mt-2 flex items-center">
                                {carData.image && (
                                    <div className="mr-4">
                                        <img
                                            src={carData.image}
                                            alt="Car preview"
                                            className="h-24 w-32 object-cover rounded-md"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/300/200';
                                                e.target.alt = 'Car image not available';
                                            }}
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/cars')}
                                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </Layout>

    )
}

export default CarModify
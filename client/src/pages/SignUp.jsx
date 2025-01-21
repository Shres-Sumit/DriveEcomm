import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const navigate = useNavigate();
    const [datas, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        userName: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setdata({
            ...datas,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/user/signup`, datas);
            if (data.success) {
                navigate('/login');
                toast.success('User created successfully', {
                    duration: 5000,
                });
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred');
            } else if (error.request) {
                setError('No response from server');
            } else {
                setError('Error in request setup');
            }
        }
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-green-500 to-green-500 ">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 uppercase">Sign Up</h2>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={datas.firstName}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={datas.lastName}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={datas.email}
                                autoComplete='off'
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={datas.password}
                                    autoComplete='off'
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={datas.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={datas.phone}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={datas.address}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                value={datas.userName}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center font-medium"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;

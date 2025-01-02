import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const Login = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [datas, setdata] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(datas);
        try {
            const { data } = await axios.post(`/user/login`, datas);
            console.log(data);
            if (data.success) {
                localStorage.setItem('auth', JSON.stringify(data));
                toast.success('User login successful', {
                    duration: 5000
                });
                setAuth({
                    user: data.user,
                    token: data.token
                });
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError(error.response.data.message || 'An error occurred');
            } else if (error.request) {
                setError('No response from server');
            } else {
                setError('Error in request setup');
            }
        }
    };

    const handleChange = (e) => {
        setdata({
            ...datas,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-gray-200">
                <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
                    {/* Login Form Section */}
                    <div className="w-1/2 p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    value={datas.email}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    value={datas.password}
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Login
                            </button>
                        </form>
                    </div>

                    {/* Sign In Section */}
                    <div className="w-1/2 bg-blue-100 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">New Here?</h2>
                            <p className="text-gray-600 mb-6">Create an account and join us!</p>
                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

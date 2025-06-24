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
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setdata({
            ...datas,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (datas.password !== datas.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await axios.post(`/user/signup`, datas);
            if (data.success) {
                toast.success('User created successfully');
                navigate('/login');
            }
        } catch (error) {
            let errorMessage = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 uppercase">Sign Up</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" name="firstName" value={datas.firstName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" name="lastName" value={datas.lastName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" value={datas.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" name="password" value={datas.password} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input type="password" name="confirmPassword" value={datas.confirmPassword} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" name="phone" value={datas.phone} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" name="address" value={datas.address} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input type="text" name="userName" value={datas.userName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-700"} text-white py-2 px-4 rounded-md text-center font-medium`}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;

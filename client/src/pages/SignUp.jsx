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
    const [otp, setOtp] = useState('');
    const [showOTPSection, setShowOTPSection] = useState(false);
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

        try {
            const { data } = await axios.post(`/user/signup`, datas);
            if (data.success) {
                toast.success('User created, OTP sent to email');
                setShowOTPSection(true); // show OTP input
            }
        } catch (error) {
            let errorMessage = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const { data } = await axios.post('/user/verify-email', {
                email: datas.email,
                otp
            });

            if (data.success) {
                toast.success("Email verified successfully");
                navigate('/login');
            }
        } catch (error) {
            const msg = error?.response?.data?.message || 'OTP verification failed';
            toast.error(msg);
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post('/user/resend-otp', { email: datas.email });
            if (data.success) {
                toast.success("OTP resent to your email");
            }
        } catch (error) {
            const msg = error?.response?.data?.message || 'Failed to resend OTP';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
                    {!showOTPSection ? (
                        <form className="grid gap-6" onSubmit={handleSubmit}>
                            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 uppercase">Sign Up</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name Fields */}
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" name="firstName" value={datas.firstName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" name="lastName" value={datas.lastName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" value={datas.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>

                            {/* Passwords */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" name="password" value={datas.password} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input type="password" name="confirmPassword" value={datas.confirmPassword} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="tel" name="phone" value={datas.phone} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input type="text" name="address" value={datas.address} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                </div>
                            </div>

                            {/* Username */}
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" name="userName" value={datas.userName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>

                            <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-center font-medium">
                                Register
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">Verify your Email</h2>
                            <p className="mb-4 text-gray-600">Enter the OTP sent to <strong>{datas.email}</strong></p>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="border p-2 rounded w-full mb-4"
                            />
                            <button onClick={handleVerifyOTP} className="bg-green-600 text-white py-2 px-4 rounded mr-2">Verify</button>
                            <button onClick={handleResendOTP} disabled={isLoading} className="bg-gray-500 text-white py-2 px-4 rounded">
                                {isLoading ? "Sending..." : "Resend OTP"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SignUp;

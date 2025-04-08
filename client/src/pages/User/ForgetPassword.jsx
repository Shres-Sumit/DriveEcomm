import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1: Email Check, 2: Reset Password
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const { data } = await axios.post("/user/check-email", { email });
            if (data.success) {
                setStep(2);
                setError(null)
            } else {
                setError("Email not found");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };


    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const { data } = await axios.post("/user/reset-password", { email, password });
            if (data.success) {
                toast.success("Password reset successful!", { duration: 2000 });
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError("Failed to reset password");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    // Toggle new password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);

    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        {step === 1 ? "Forgot Password" : "Reset Password"}
                    </h2>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {step === 1 ? (
                        // Step 1: Email Verification
                        <form onSubmit={handleEmailSubmit} className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter your email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border rounded mt-1"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 w-full rounded"
                            >
                                Next
                            </button>
                        </form>
                    ) : (
                        // Step 2: Password Reset
                        <form onSubmit={handleResetPassword} className="mt-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 border rounded mt-1 pr-10"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-600" />
                                    ) : (
                                        <FaEye className="text-gray-600" />
                                    )}
                                </div>
                            </div>

                            <div className="relative mt-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 border rounded mt-1 pr-10"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash className="text-gray-600" />
                                    ) : (
                                        <FaEye className="text-gray-600" />
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const Login = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const [datas, setdata] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(datas)
        try {
            const { data } = await axios.post(`/user/login`, datas)
            console.log(data)
            if (data.success) {
                localStorage.setItem('auth', JSON.stringify(data))
                toast.success('user login successfully', {
                    duration: 5000
                })
                setAuth({
                    user: data.user,
                    token: data.token
                })
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            if (error.response) {
                setError(error.response.data.message || 'an error occured')
            } else if (error.request) {
                setError('No response from server')
            } else {
                setError('Error in request setup')
            }
        }
    }

    const handleChane = (e) => {
        setdata({
            ...datas,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow-2xl">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
                    </div>
                    {error && (
                        <div className="bg-red-100 border w-[80%] mx-10 border-red-400 text-red-700 px-4 py-3 rounded relative top-[-12px]" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-900"
                            >
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
                                onChange={handleChane}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                value={datas.password}
                                id="password"
                                type="password"
                                name="password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                onChange={handleChane}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium text-gray-700 cursor-pointer"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Login
                        </button>

                        <div className="space-x-2">
                            <span>If not register <Link className="cursor-pointer hover:underline font-bold text-lg hover:text-blue-600" to={"/signup"}>Click here...</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
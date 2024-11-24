import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200  p-4 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl ">
                <div className="p-6 border-b border-gray-200 ">
                    <h2 className="text-2xl font-bold text-center text-gray-900 ">Login</h2>
                </div>

                <div className="p-6">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium  text-gray-900"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent   text-sm"
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
                                id="password"
                                type="password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                                className="text-sm font-medium text-gray-700  cursor-pointer"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Sign in
                        </button>

                        <div className=' space-x-2'>
                            <span>If not register <Link className='cursor-pointer hover:underline font-bold text-lg  hover:text-blue-600' to={'/signup'}>Click here...</Link></span>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default Login;
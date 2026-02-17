import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userRegister } from '../../api/authapi.js'

const Register = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password does not match")
            return
        }

        try {
            const response = await userRegister(userName, email, password);
            console.log('Registration sucessful:', response.data)
            window.location.href = '/login'

        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = "/";
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-4xl font-bold tracking-tight text-snapdeal-red">EcomApp</h1>
                <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join us to start shopping for premium products
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                {/* Card Container */}
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-2xl sm:px-10 border border-gray-100">
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Username Input */}
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    autoComplete="userName"
                                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-snapdeal-red focus:ring-snapdeal-red sm:text-sm bg-gray-50 border transition-colors"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-snapdeal-red focus:ring-snapdeal-red sm:text-sm bg-gray-50 border transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-snapdeal-red focus:ring-snapdeal-red sm:text-sm bg-gray-50 border transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-snapdeal-red focus:ring-snapdeal-red sm:text-sm bg-gray-50 border transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-snapdeal-red to-[#c2003c] hover:from-[#c2003c] hover:to-[#a00030] hover:shadow-lg hover:shadow-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-snapdeal-red transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    {/* Footer / Login Link */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to="/login"
                                className="font-semibold text-snapdeal-red hover:text-[#c2003c] hover:underline transition-all"
                            >
                                Login in to your account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
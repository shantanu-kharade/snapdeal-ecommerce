"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProfile } from "../api/userApi"

const NavbarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
        setIsOpen(false)
    }

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getProfile();
            console.log("User Profile", response.data)
            setProfile(response.data);
        }
        fetchUser()
    }, [])



    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="w-12 h-12 bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white rounded-full hover:from-[#c2003c] hover:to-snapdeal-red transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
            >


                <svg
                    className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden">
                    {token ? (
                        <>
                            {profile.role === 'admin' &&
                                <Link
                                    to="/admin/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-snapdeal-red transition-colors font-medium border-b border-gray-100"
                                >
                                    Admin dashboard
                                </Link>
                            }

                            <Link
                                to="/userprofile"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-snapdeal-red transition-colors font-medium border-b border-gray-100"
                            >
                                My Account
                            </Link>
                            <Link
                                to="/orderhistory"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-snapdeal-red transition-colors font-medium border-b border-gray-100"
                            >
                                Order History
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-snapdeal-red transition-colors font-medium border-b border-gray-100"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-snapdeal-red transition-colors font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default NavbarDropdown
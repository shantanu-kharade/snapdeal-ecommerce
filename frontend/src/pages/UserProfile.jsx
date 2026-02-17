import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import { getProfile, updateProfile } from '../api/userApi.js'

const UserProfile = () => {

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
        <div className="min-h-screen bg-gray-50">
            <NavBar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Card Container */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100">


                    <div className="w-full md:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 border-b md:border-b-0 md:border-r border-gray-200 p-8 flex flex-col items-center justify-center gap-6">
                        <div className="relative group">
                            {/* Profile Circle */}
                            <div className="w-48 h-48 rounded-full p-1 bg-gradient-to-r from-snapdeal-red to-[#c2003c] shadow-lg">
                                <img
                                    src={profile.profilePic}
                                    alt=""
                                    className="w-full h-full rounded-full object-cover border-4 border-white bg-gradient-to-r from-snapdeal-red to-[#c2003c]"
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">{profile.userName || "User"}</h2>
                            <p className="text-snapdeal-red font-medium text-sm">{profile.role}</p>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col gap-6">

                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile Details</h1>

                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Username</label>
                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                                {profile.userName || "Loading..."}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                                {profile.email || "Loading..."}
                            </div>
                        </div>


                        <div className="flex-1 min-h-[200px] flex flex-col space-y-2">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Order History</label>
                            <div className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-6 overflow-y-auto">
                                {profile.orderHistory && profile.orderHistory.length > 0 ? (
                                    <div className="text-gray-900">
                                        {profile.orderHistory}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                        <span className="text-3xl">📦</span>
                                        <p>No order history found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Update Profile Button */}
                        <div className="pt-4">
                            <button className="w-full py-3.5 bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-200 transform hover:scale-[1.01]">
                                Update Profile
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
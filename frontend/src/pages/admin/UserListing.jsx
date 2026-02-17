import React from 'react'
import { useState, useEffect } from 'react';
import { getALlUsers } from '../../api/userApi.js'
import AdminNavBar from '../../components/AdminNavbar.jsx'
const UserListing = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getALlUsers();
                console.log(response)
                setUsers(response.data)
            } catch (error) {
                console.log(error)

            } finally {
                setIsLoading(false);
            }
        }
        fetchUsers()
    }, [])


    const getRoleStyle = (role) => {
        const r = role?.toLowerCase();
        if (r === 'admin') return 'bg-purple-100 text-purple-700 border-purple-200';
        return 'bg-red-50 text-snapdeal-red border-red-200';
    }

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-600 mt-1">Overview of all registered members</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-snapdeal-red"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">

                        {/* Table Header - Hidden on small screens, shown on md+ */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-5">User</div>
                            <div className="col-span-5">Email</div>
                            <div className="col-span-2 text-right">Role</div>
                        </div>


                        {users?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="text-5xl mb-4">👥</div>
                                <h3 className="text-lg font-bold text-gray-900">No users found</h3>
                                <p className="text-gray-500">The user database appears to be empty.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {users?.map((user) => (
                                    <div
                                        key={user.id || user.userName}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center group"
                                    >

                                        <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-snapdeal-red to-[#c2003c] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                                {user.userName?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <h1 className="font-bold text-gray-900 group-hover:text-snapdeal-red transition-colors">
                                                    {user.userName}
                                                </h1>

                                                <p className="text-sm text-gray-500 md:hidden">{user.email}</p>
                                            </div>
                                        </div>


                                        <div className="hidden md:block col-span-5 text-gray-600 font-medium">
                                            {user.email}
                                        </div>


                                        <div className="col-span-1 md:col-span-2 flex md:justify-end">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getRoleStyle(user.role)}`}>
                                                {user.role || "User"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Count */}
                {users?.length > 0 && (
                    <div className="mt-4 text-right text-sm text-gray-500 font-medium">
                        Total Users: {users.length}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserListing
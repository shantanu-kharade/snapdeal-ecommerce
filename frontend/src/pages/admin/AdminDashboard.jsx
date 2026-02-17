import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import AdminNavBar from '../../components/AdminNavbar'

const AdminDashboard = () => {
    const location = useLocation()

    const navItems = [
        { path: '/admin/dashboard/user', label: 'User Management', icon: '👥' },
        { path: '/admin/dashboard/createproduct', label: 'Product Management', icon: '📦' },
        { path: '/admin/dashboard/order', label: 'Order Management', icon: '📋' },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavBar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


                <div className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-snapdeal-red to-[#c2003c] mb-2">
                        Welcome back, Admin
                    </h1>
                    <p className="text-lg text-gray-600">
                        Manage your Premium Store operations efficiently.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <nav className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${isActive
                                    ? 'bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white shadow-lg shadow-red-200 transform scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-snapdeal-red border border-gray-100 shadow-sm hover:shadow-md'
                                }`
                            }
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-8 transition-all duration-500 ease-in-out">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
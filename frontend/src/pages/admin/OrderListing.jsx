import React, { useState, useEffect } from 'react'
import { getAllOrders, updateStatus } from '../../api/orderApi'

const OrderListing = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [updatingOrderId, setUpdatingOrderId] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getAllOrders();

                setOrders(response.data || [])
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrder();
    }, [])

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            setUpdatingOrderId(orderId)

            await updateStatus(orderId, newStatus)


            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, orderStatus: newStatus } : order
                )
            )
        } catch (error) {
            console.error("Failed to update status", error)
            alert("Failed to update order status. Please try again.")
        } finally {
            setUpdatingOrderId(null)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-snapdeal-red"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">

                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-3">Order ID</div>
                            <div className="col-span-3">Customer ID</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2">Total</div>
                            <div className="col-span-2 text-right">Status</div>
                        </div>

                        {/* Order Rows */}
                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="text-5xl mb-4">📦</div>
                                <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
                                <p className="text-gray-500">New orders will appear here.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center group"
                                    >
                                        {/* Order ID */}
                                        <div className="col-span-1 md:col-span-3">
                                            <p className="font-mono text-sm font-semibold text-gray-900 truncate" title={order._id}>
                                                #{order._id.slice(-8).toUpperCase()}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {order.products?.length || 0} {order.products?.length === 1 ? 'Item' : 'Items'}
                                            </p>
                                        </div>

                                        {/* Customer ID */}
                                        <div className="col-span-1 md:col-span-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                                    👤
                                                </div>
                                                <p className="font-mono text-xs text-gray-600 truncate max-w-[150px]" title={order.userId}>
                                                    {order.userId}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="col-span-1 md:col-span-2 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>

                                        {/* Total Amount */}
                                        <div className="col-span-1 md:col-span-2">
                                            <span className="font-bold text-gray-900">
                                                ₹{order.totalAmount?.toLocaleString('en-IN')}
                                            </span>
                                        </div>

                                        {/* Status Dropdown */}
                                        <div className="col-span-1 md:col-span-2 flex md:justify-end">
                                            {updatingOrderId === order._id ? (
                                                <div className="px-3 py-1 flex items-center gap-2 text-sm text-snapdeal-red font-medium bg-red-50 rounded-full border border-red-100">
                                                    <div className="w-3 h-3 border-2 border-snapdeal-red border-t-transparent rounded-full animate-spin"></div>
                                                    Updating...
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <select
                                                        value={order.orderStatus}
                                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                        disabled={updatingOrderId !== null}
                                                        className={`appearance-none cursor-pointer pl-4 pr-8 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border outline-none focus:ring-2 focus:ring-offset-1 focus:ring-snapdeal-red transition-all ${getStatusStyle(order.orderStatus)}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>

                                                    {/* Custom Arrow Icon */}
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}


                {orders.length > 0 && (
                    <div className="mt-4 text-right text-sm text-gray-500 font-medium">
                        Showing {orders.length} orders
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderListing
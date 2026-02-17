
import { useState, useEffect } from "react"
import { getOrders, cancleOrder } from "../api/orderApi.js"
import NavBar from "../components/NavBar.jsx"

const OrderHistory = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setIsLoading(true)
                setError(null)
                console.log("[v0] Starting order fetch...")
                const response = await getOrders()
                console.log("[v0] Orders response received:", response)

                const ordersList = response?.data || response || []
                setOrders(Array.isArray(ordersList) ? ordersList : [])
            } catch (err) {
                console.error("[v0] Error fetching orders:", err)
                setError(err.message || "Failed to load orders. Please try again.")
                setOrders([])
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrder()
    }, [])

    const handleCancelOrder = async (orderId) => {
        try {
            console.log("[v0] Canceling order with ID:", orderId)
            const response = await cancleOrder(orderId)
            console.log("[v0] Order canceled:", response)
            setOrders(orders.filter((order) => order._id !== orderId))

        } catch (error) {
            console.error("[v0] Error canceling order:", error)
            setError("Failed to cancel order. Please try again.")
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "confirmed":
                return "bg-blue-100 text-blue-800"
            case "shipped":
                return "bg-purple-100 text-purple-800"
            case "delivered":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    if (isLoading) {
        return (
            <div>
                <NavBar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-snapdeal-red mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your orders...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <NavBar />
                <div className="max-w-7xl mx-auto px-4 py-8 mt-8">
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                        <p className="text-red-600 font-semibold mb-4">Error: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 py-8 mt-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
                    <p className="text-gray-600">
                        {orders.length} {orders.length === 1 ? "order" : "orders"} found
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                        <p className="text-xl font-semibold text-gray-600 mb-2">No orders yet</p>
                        <p className="text-gray-500 mb-6">Start shopping to place your first order</p>
                        <a
                            href="/products"
                            className="px-6 py-2.5 bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-200 transition-all"
                        >
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow items-center justify-between"
                            >
                                {/* Order Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Order #{order._id?.slice(-8).toUpperCase()}</h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {order.products?.length || 0} {order.products?.length === 1 ? "item" : "items"}
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="text-lg font-semibold text-snapdeal-red">₹{order.totalAmount || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Order Date</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status and Action */}
                                <div className="flex-shrink-0 flex flex-col items-end gap-3">
                                    <span className={`px-4 py-2 font-semibold rounded-lg text-sm ${getStatusColor(order.orderStatus)}`}>
                                        {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1) || "Pending"}
                                    </span>
                                    {order.orderStatus?.toLowerCase() !== "delivered" &&
                                        order.orderStatus?.toLowerCase() !== "cancelled" && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="px-4 py-2 text-red-600 border-2 border-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    {(order.orderStatus?.toLowerCase() === "delivered" ||
                                        order.orderStatus?.toLowerCase() === "cancelled") && (
                                            <span className="px-4 py-2 text-gray-600 font-semibold rounded-lg">
                                                {order.orderStatus?.toLowerCase() === "delivered" ? "Delivered" : "Cancelled"}
                                            </span>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderHistory

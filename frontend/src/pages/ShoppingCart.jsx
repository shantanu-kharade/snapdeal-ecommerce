"use client"
import { useState, useEffect, } from "react"
import { removeCartItem, getCartItem } from "../api/cartApi"
import NavBar from "../components/NavBar"
import { placeOrder } from "../api/orderApi"
import { useNavigate } from "react-router-dom"


const ShoppingCart = () => {

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [carts, setCart] = useState(null)


    const fetchItems = async () => {
        try {
            setIsLoading(true)
            setError(null)
            console.log("[v0] Starting cart fetch...")
            const items = await getCartItem()
            console.log("[v0] Cart response received:", items)

            const products = items?.data?.products || []
            console.log("[v0] Extracted products:", products)
            const cart = items?.data || []
            setCart(cart);
            setCartItems(products);
        } catch (err) {
            console.error("[v0] Error fetching cart:", err)
            setError(err.message || "Failed to load cart items. Please try again.")
            setCartItems([])
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchItems()
    }, [])

    console.log("Cart items", cartItems);
    console.log("cart", carts)

    const handleRemoveItem = async (productId) => {
        try {
            console.log("Removing product with ID:", productId)
            const response = await removeCartItem(productId)
            console.log("Product removed from cart:", response)
            setCartItems(prevItems =>
                prevItems.filter((item) =>
                    item.productId._id.toString() !== productId.toString()
                )
            );
            fetchItems()
        } catch (error) {
            console.error("Error removing product from cart:", error)
            throw new Error
        }
    }

    const handleOrder = async () => {
        try {

            const productsPayload = cartItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            }));

            const response = await placeOrder(productsPayload, total);
            console.log("Order placed", response)
            await fetchItems()
        } catch (error) {
            console.log("Error in order placement", error)
            throw new Error
        }
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0)
    const total = totalPrice + Math.round(Math.round(totalPrice * 0.18))

    const handleNaviagate = () => {
        navigate("/")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <NavBar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-snapdeal-red mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading your cart...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <NavBar />
                <div className="max-w-7xl mx-auto px-4 py-8 mt-8">
                    <div className="bg-white border border-red-100 shadow-xl shadow-red-50 rounded-2xl p-8 text-center">
                        <p className="text-red-600 font-semibold mb-4">Error: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white shadow-xl shadow-gray-100 rounded-2xl border border-gray-100">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</p>
                        <p className="text-gray-500 mb-8">Start shopping to add items to your cart</p>
                        <a
                            href="/"
                            className="px-8 py-3 bg-linear-to-r from-snapdeal-red to-[#c2003c] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-200 transition-all transform hover:scale-105"
                        >
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.productId._id}
                                        className="flex gap-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.productId.imageUrl || "/placeholder.svg"}
                                                alt={item.productId.productName}
                                                className="w-24 h-24 object-cover rounded-xl border border-gray-100"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.productId.productName}</h3>
                                                        <p className="text-sm text-gray-500 line-clamp-1">{item.productId.description}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.productId._id)}
                                                        className="text-red-500 bg-red-200 p-2 rounded-md hover:text-red-700 text-sm font-semibold transition-colors cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between mt-4">
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Quantity</p>
                                                        <p className="text-base font-semibold text-gray-900">{item.quantity}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
                                                        <p className="text-base font-semibold text-snapdeal-red">₹{item.productId.price}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</p>
                                                    <p className="text-xl font-bold text-gray-900">₹{item.productId.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            {/* Updated to White Card style to match Login/Register */}
                            <div className="bg-white border border-gray-100 shadow-xl shadow-gray-100 rounded-2xl p-6 sticky top-24 h-fit">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-snapdeal-red">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (est. 18%)</span>
                                        <span className="font-semibold text-gray-900">₹{Math.round(totalPrice * 0.18)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-snapdeal-red to-[#c2003c]">
                                        ₹{totalPrice + Math.round(totalPrice * 0.18)}
                                    </span>
                                </div>

                                <button
                                    onClick={() => { handleOrder() }}
                                    className="w-full px-4 py-3.5 bg-gradient-to-r cursor-pointer from-snapdeal-red to-[#c2003c] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-200 transition-all duration-200 transform hover:scale-[1.02] mb-3">
                                    Checkout Now
                                </button>
                                <button
                                    onClick={handleNaviagate}
                                    className="w-full px-4 py-3.5 cursor-pointer border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-snapdeal-red hover:text-snapdeal-red transition-colors">
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShoppingCart
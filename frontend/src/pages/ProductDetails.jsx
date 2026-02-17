import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/NavBar.jsx'
import { fetchProductById } from '../api/api.js'
import { useParams } from 'react-router-dom'
import { addToCart } from '../api/cartApi.js'

const ProductDetails = () => {
    const { id } = useParams();
    const [productDetail, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await fetchProductById(id);
                setProductDetails(response.data);
                console.log("product details", response)
            } catch (error) {
                console.log(error)
            }
        }
        getProductById()
    }, [id])

    const handleAddToCart = async () => {
        try {
            const response = await addToCart(productDetail._id, quantity);
            console.log("response", response)
        } catch (error) {
            console.log(error)
        }
    }

    if (!productDetail) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-snapdeal-red"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start'>
                    {/* Image Section - Card Style */}
                    <div className='bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden'>
                        <div className='w-full aspect-square flex items-center justify-center relative z-10'>
                            <img
                                src={productDetail.imageUrl || "/placeholder.svg"}
                                alt={productDetail.productName}
                                className='w-full h-full object-contain hover:scale-105 transition-transform duration-500'
                            />
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-transparent opacity-50 z-0 pointer-events-none" />
                    </div>

                    {/* Details Section */}
                    <div className='flex flex-col h-full pt-4'>
                        {/* Product Info */}
                        <div className='space-y-8'>
                            <div>
                                <div className='flex items-center gap-3 mb-4'>
                                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-snapdeal-red uppercase tracking-wide border border-red-100'>
                                        {productDetail.category}
                                    </span>
                                </div>
                                <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                                    {productDetail.productName}
                                </h1>
                            </div>

                            <div className='border-t border-b border-gray-100 py-6'>
                                <div className="flex items-end gap-4">
                                    <p className='text-4xl font-bold text-gray-900'>
                                        ₹{productDetail.price.toLocaleString('en-IN')}
                                    </p>
                                    <p className='text-gray-500 mb-1.5 font-medium'>Inclusive of all taxes</p>
                                </div>
                            </div>

                            <div className='prose prose-gray max-w-none'>
                                <p className='text-gray-600 text-lg leading-relaxed'>
                                    {productDetail.description}
                                </p>
                            </div>
                        </div>

                        {/* Purchase Section */}
                        <div className='mt-10 p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-50'>
                            <div className='flex flex-col sm:flex-row gap-6 items-center'>
                                {/* Quantity Selector */}
                                <div className='w-full sm:w-auto'>
                                    <label className='block text-sm font-bold text-gray-700 mb-2'>Quantity</label>
                                    <div className='flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 w-fit'>
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className='w-10 h-10 flex items-center justify-center text-gray-600 hover:text-snapdeal-red hover:bg-white rounded-lg transition-all shadow-sm font-bold text-lg'
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            className='w-16 text-center border-0 bg-transparent text-gray-900 font-bold text-lg outline-none focus:ring-0 p-0'
                                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                        />
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className='w-10 h-10 flex items-center justify-center text-gray-600 hover:text-snapdeal-red hover:bg-white rounded-lg transition-all shadow-sm font-bold text-lg'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <div className='flex-1 w-full'>
                                    <label className='block text-sm font-bold text-transparent mb-2 select-none'>Action</label>
                                    <button
                                        onClick={() => handleAddToCart()}
                                        className='w-full px-8 py-3.5 bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center cursor-pointer gap-2 text-lg'
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
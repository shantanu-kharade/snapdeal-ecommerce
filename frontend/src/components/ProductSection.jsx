"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "../api/api.js"
import ProductCard from "./ProductCard.jsx"

const ProductSection = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true)
                const response = await fetchProducts()
                setProducts(response.data)
                console.log("Products fetched in ProductSection:", response)
            } catch (err) {
                console.log("error", err)
                setError("Failed to load products")
            } finally {
                setLoading(false)
            }
        }
        getProduct()
    }, [])

    return (
        <div className="w-full bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Featured{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-snapdeal-red to-[#c2003c]">Products</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our handpicked collection of premium products, curated just for you
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-snapdeal-red"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-700 mb-8">{error}</div>
                )}

                {/* Products Grid */}
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products available at the moment</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductSection

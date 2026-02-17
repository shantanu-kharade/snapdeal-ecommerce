"use client"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ product }) => {
    const navigate = useNavigate()

    return (
        <div className="group h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                {/* Optional: 'New' Badge - You can make this conditional based on product data */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-snapdeal-red px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    New
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                {/* Category Tag */}
                <div className="text-xs font-semibold text-snapdeal-red uppercase tracking-wider">
                    {product.category || "Collection"}
                </div>

                {/* Product Name */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-snapdeal-red transition-colors">
                        {product.productName}
                    </h2>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Price Section */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">Inclusive of taxes</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0">
                <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ProductCard
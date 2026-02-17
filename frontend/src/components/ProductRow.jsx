import React from 'react'

const ProductRow = ({ product, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center group">

            {/* Image & Name */}
            <div className="col-span-4 md:col-span-5 flex items-center gap-4">
                <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                    <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.productName}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{product.productName}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 hidden md:block">{product.description}</p>
                </div>
            </div>

            {/* Category */}
            <div className="col-span-2 hidden md:block">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-snapdeal-red">
                    {product.category}
                </span>
            </div>

            {/* Stock */}
            <div className="col-span-2 hidden md:block">
                <span className={`text-sm font-medium ${product.stock < 10 ? 'text-orange-600' : 'text-gray-600'}`}>
                    {product.stock} units
                </span>
            </div>

            {/* Price */}
            <div className="col-span-3 md:col-span-2 font-bold text-gray-900">
                ₹{product.price}
            </div>

            {/* Actions */}
            <div className="col-span-3 md:col-span-1 flex justify-end gap-2">
                <button
                    onClick={onEdit}
                    className="p-2 text-snapdeal-dark hover:bg-gray-100 rounded-lg transition-colors border-2"
                    title="Edit"
                >
                    update
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProductRow
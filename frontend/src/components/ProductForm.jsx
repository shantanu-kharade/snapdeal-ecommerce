import React, { useState } from 'react'

const ProductForm = ({ product, onSave, onCancel }) => {


    const [formData, setFormData] = useState({
        productName: product?.productName || '',
        description: product?.description || '',
        price: product?.price || '',
        category: product?.category || '',
        stock: product?.stock || '',
        imageUrl: product?.imageUrl || ''
    })



    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData)
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {product ? 'Edit Product' : 'Create New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snapdeal-red focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Premium Leather Bag"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snapdeal-red focus:border-transparent outline-none transition-all"
                        placeholder="Product details..."
                    />
                </div>

                {/* Grid for Price, Stock, Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snapdeal-red outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snapdeal-red outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snapdeal-red outline-none bg-white"
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Home">Home</option>
                            <option value="Books">Books</option>
                        </select>
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-snapdeal-red outline-none"
                        placeholder="https://..."
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-linear-to-r from-snapdeal-red to-[#c2003c] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        {product ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm
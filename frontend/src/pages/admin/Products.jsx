import React, { useState, useEffect } from 'react'
import { createProduct, updateProduct, deleteProduct } from '../../api/productApi.js'
import { fetchProducts } from '../../api/api.js'

import ProductRow from '../../components/ProductRow.jsx'
import ProductForm from '../../components/ProductForm.jsx'

const Products = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)


    const loadProducts = async () => {
        try {
            setIsLoading(true)
            const response = await fetchProducts()
            setProducts(response.data)
        } catch (error) {
            console.error("Error loading products:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id)
                setProducts(products.filter(p => p._id !== id))
            } catch (error) {
                console.error("Error deleting product:", error)
                alert("Failed to delete product")
            }
        }
    }

    // if product does not exits create the prodcut
    // if product exits update the product
    const handleSave = async (formData) => {
        try {
            if (currentProduct) {
                await updateProduct(currentProduct._id, formData)
            } else {

                await createProduct(formData)
            }
            setIsModalOpen(false)
            loadProducts()
        } catch (error) {
            console.error("Error saving product:", error)
            alert("Failed to save product")
        }
    }


    const openCreateModal = () => {
        setCurrentProduct(null)
        setIsModalOpen(true)
    }

    const openEditModal = (product) => {
        setCurrentProduct(product)
        setIsModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                        <p className="text-gray-600 mt-1">Manage your inventory, prices, and stock</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-6 py-3 bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-200 transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                        <span>+</span> Create New Product
                    </button>
                </div>

                {/* Listing Section */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-snapdeal-red"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-4 md:col-span-5">Product</div>
                            <div className="col-span-2 hidden md:block">Category</div>
                            <div className="col-span-2 hidden md:block">Stock</div>
                            <div className="col-span-3 md:col-span-2">Price</div>
                            <div className="col-span-3 md:col-span-1 text-right">Actions</div>
                        </div>

                        {/* Product Rows */}
                        <div className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">No products found.</div>
                            ) : (
                                products.map(product => (
                                    <ProductRow
                                        key={product._id}
                                        product={product}
                                        onEdit={() => openEditModal(product)}
                                        onDelete={() => handleDelete(product._id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Create/Update */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <ProductForm
                            product={currentProduct}
                            onSave={handleSave}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products
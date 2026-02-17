"use client"
import ProductCard from "../components/ProductCard.jsx"
import { fetchProducts } from "../api/api.js"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar.jsx"

const ProductList = () => {

    const [allProdutcts, setAllProducts] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [activeCategory, setActiveCategory] = useState("all")

    const selectCategory = (category) => {

        const filterProducts = products.filter((product) => product.category === category)
        console.log("Filtered Products", filterProducts)
        setAllProducts(filterProducts)
        setActiveCategory(category)
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true)
                const product = await fetchProducts()
                setAllProducts(product.data)
                setProducts(product.data)
                setActiveCategory("all")
                console.log("Products fetched in product listing", product)
            } catch (error) {
                setError(error.message)
                console.log("Error Fetch : ", error)
            } finally {
                setLoading(false)
            }
        }
        getProduct()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />

            <div className="px-4 md:px-8 lg:px-20 py-12">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-snapdeal-red to-[#c2003c] mb-3">
                        Our Collections
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Browse through our curated selection of premium products designed for your lifestyle.
                    </p>
                </div>

                {/* Category Filter Buttons */}
                <div className="max-w-7xl mx-auto mb-10">
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <button
                            onClick={() => {
                                setAllProducts(products)
                                setActiveCategory("all")
                            }}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${activeCategory === "all"
                                ? "bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white shadow-lg shadow-red-200 scale-105"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-snapdeal-red hover:text-snapdeal-red hover:shadow-md"
                                }`}
                        >
                            All Products
                        </button>

                        {["Electronics", "Clothing", "Home", "Books"].map((category) => (
                            <button
                                key={category}
                                onClick={() => selectCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${activeCategory === category
                                    ? "bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white shadow-lg shadow-red-200 scale-105"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-snapdeal-red hover:text-snapdeal-red hover:shadow-md"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-red-100 border-t-snapdeal-red rounded-full animate-spin"></div>
                                <p className="text-gray-500 font-medium animate-pulse">Curating products...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
                            <div className="text-red-500 text-4xl mb-4">⚠️</div>
                            <h3 className="text-lg font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : allProdutcts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100 text-center px-4">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                We couldn't find any items in the <span className="font-semibold text-snapdeal-red">{activeCategory}</span> category.
                            </p>
                            <button
                                onClick={() => {
                                    setAllProducts(products)
                                    setActiveCategory("all")
                                }}
                                className="mt-6 text-snapdeal-red font-semibold hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <p className="text-gray-500 font-medium">
                                    Showing {allProdutcts.length} results
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {allProdutcts.map((product) => (
                                    <ProductCard key={product._id || product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductList
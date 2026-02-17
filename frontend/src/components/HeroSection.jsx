import heroimage1 from "../assets/heroImage1.png"

const HeroSection = () => {
    return (
        <div className="w-full">
            {/* Search Bar Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white px-4 md:px-20 py-6 border-b border-gray-200">
                <div className="flex justify-center h-12 gap-0">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="flex-1 max-w-xl px-4 rounded-l-full border border-gray-300 focus:outline-none focus:border-snapdeal-red focus:ring-2 focus:ring-red-200 transition-all placeholder-gray-500"
                    />
                    <button className="px-6 rounded-r-full border border-l-0 border-gray-300 bg-white hover:bg-red-50 transition-colors text-gray-700 hover:text-snapdeal-red">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Hero Content Section */}
            <div className="px-4 md:px-20 py-12 md:py-20 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                                Welcome to the{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-snapdeal-red to-[#c2003c]">
                                    Premium Store
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                Discover curated collections of high-quality products at unbeatable prices. Shop with confidence backed
                                by our premium service guarantee.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="px-8 py-3 bg-gradient-to-r from-snapdeal-red to-[#c2003c] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-red-200 transition-all duration-200 transform hover:scale-105">
                                Shop Now
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-6 pt-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Easy Returns</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-full h-full min-h-96 md:min-h-full">
                            <img
                                src={heroimage1 || "/placeholder.svg"}
                                alt="Hero product showcase"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-300"
                            />
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-snapdeal-red/10 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection

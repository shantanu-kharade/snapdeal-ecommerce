import React, { useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection.jsx'
import ProductSection from '../components/ProductSection.jsx'


const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        }
    }, [navigate])
    return (


        <div>
            <NavBar />
            <div className='flex flex-wrap gap-2 '>
                <HeroSection />
                <ProductSection />
            </div>
        </div>
    )
}

export default Home
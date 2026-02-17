import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import ShoppingCart from './pages/ShoppingCart'
import UserProfile from './pages/UserProfile'
import OrderHistory from './pages/OrderHistory'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import PlaceOrder from './pages/PlaceOrder'
import Products from './pages/Products'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateProduct from './pages/admin/Products'
import OrderListing from './pages/admin/OrderListing'
import UserListing from './pages/admin/UserListing'




function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/products' element={<Products />} />
                <Route path='/orderhistory' element={<OrderHistory />} />
                <Route path='/productlist' element={<ProductList />} />
                <Route path='/placeorder' element={<PlaceOrder />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/cart' element={<ShoppingCart />} />
                <Route path='/userprofile' element={<UserProfile />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} >
                    <Route path='user' element={<UserListing />} />
                    <Route path='createproduct' element={<CreateProduct />} />
                    <Route path='order' element={<OrderListing />} />
                </Route>
                <Route path='*' element={<h1>404 Page not found</h1>} />
            </Routes>
        </>
    )
}

export default App

import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log(backendURL)
const token = localStorage.getItem('token')
console.log("token at api",token)

const addToCart = async(productId, quantity)=>{
    try{
        const response = await axios.post(`${backendURL}/api/cart/add`, {
            productId,
            quantity
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }});
            return response
    }catch(error){
        console.log("Error in adding proudct in cart",error)
        throw error;
    }
}

const getCartItem = async()=>{
    try{
        const response = axios.get(`${backendURL}/api/cart`, {
            headers:{
                Authorization: `Bearer ${token}`
            }})
        return response;
    }catch(error){
        console.log("Error removing cart item : ", error)
        throw error;
    }
}

const removeCartItem = async(productId)=>{
    try{
        const response = axios.post(`${backendURL}/api/cart/remove`,{
            productId
        },{
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log("Error getting cart items", error)
    }
}

export {
    addToCart,
    getCartItem,
    removeCartItem
}
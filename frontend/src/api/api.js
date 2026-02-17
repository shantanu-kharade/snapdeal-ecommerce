import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log(backendURL)
const token = localStorage.getItem('token')
console.log('Token at api',token)
const fetchProducts = async ()=>{
    try{
        const response = await axios.get(`${backendURL}/api/products/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response;

    }catch (error){
        console.log('Error: ', error)
        throw error
    }
}

const fetchProductById= async(productId) =>{
    try{
        const response =  await axios.get(`${backendURL}/api/products/detail?id=${productId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }catch(error){
        console.log(error)
    }
}

export{
    fetchProducts,
    fetchProductById
}
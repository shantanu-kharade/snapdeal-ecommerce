import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log(backendURL)
const token = localStorage.getItem('token')
console.log('Token at api', token)

const createProduct = async (formData) => {
    try {
        const response = await axios.post(`${backendURL}/api/products/`, {
            formData
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log("Error", error);
        throw new Error
    }
}


const updateProduct = async (productId, productData) => {
    try {
       const response = await axios.put(
            `${backendURL}/api/products/?id=${productId}`, 
            productData, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.log("Error", error);
        throw new Error
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${backendURL}/api/products/?id=${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log("Error", error);
        throw new Error
    }
}


export {
    updateProduct,
    createProduct,
    deleteProduct
}
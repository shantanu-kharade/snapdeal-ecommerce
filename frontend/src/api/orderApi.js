import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log(backendURL)
const token = localStorage.getItem('token')
console.log('Token at order', token)

const placeOrder = async (products, totalAmount) => {
    try {
        const response = await axios.post(`${backendURL}/api/order/place-order`, {
            products,
            totalAmount
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getOrders = async () => {
    try {
        const response = await axios.get(`${backendURL}/api/order/order-history`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

const cancleOrder = async (orderId) => {
    try {
        const response = await axios.post(`${backendURL}/api/order/cancel-order`, {
            orderId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response

    } catch (error) {
        console.log(error)
        throw error
    }
}

const updateStatus = async (orderId, status) => {
    try {
        const response = await axios.post(`${backendURL}/api/order/update-order-status`,
            {
                orderId, status
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

const getAllOrders = async () => {
    try {
        const response = await axios.get(`${backendURL}/api/order/get-all-orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response;
    } catch (error) {
        throw new error
    }
}

const updateOrder = async (orderId, status) => {
    try {
        const response = await axios.post(`${backendURL}/api/order/update-order-status `, {
            orderId,
            status
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        return new Error

    }
}




export {
    placeOrder,
    getOrders,
    cancleOrder,
    updateStatus,
    getAllOrders,
    updateOrder
}
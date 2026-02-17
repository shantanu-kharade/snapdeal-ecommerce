import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log(backendURL)
const token = localStorage.getItem('token')
console.log('Token at api', token)

const getProfile = async () => {
    try {
        const response = await axios.get(`${backendURL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log("Error getting profile", Error)
        throw error
    }
}

const getALlUsers = async() =>{
     try {
        const response = await axios.get(`${backendURL}/api/user/get-all-user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log("Error getting profile", Error)
        throw error
    }
}

const updateProfile = async (userName, email, password, profilePic) => {
    try {
        const response = await axios.put(`${backendURL}/api/user/update-profile`, {
            userName,
            email,
            password,
            profilePic
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;

    } catch (error) {
        console.log(error);
        throw error
    }
}


export {
    getProfile,
    updateProfile,
    getALlUsers 
}
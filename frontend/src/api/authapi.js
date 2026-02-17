import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log(backendURL)
const userLogin = async (email, password) =>{
    try{
        const response = await axios.post(`${backendURL}/api/auth/login`,{
            email,
            password
        })
        return response;
    }catch(error){
        console.log("Error", error)
        throw error
    }
}

const userRegister = async(userName, email, password)=>{
    try{
        const response = await axios.post(`${backendURL}/api/auth/register`,{
            userName,
            email,
            password
        })
        return response
    }catch(error){
        console.log("Error", error)
        throw error
    }
}

export{
    userLogin,
    userRegister
}
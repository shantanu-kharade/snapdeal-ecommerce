import jwt from 'jsonwebtoken';
import 'dotenv/config'

const getUserIdFromRequest = (req) => {
    try{
        const token = req.headers['authorization'] || req.headers['Authorization'];
        const trimmedToken = token.trim().replace(/^Bearer\s+/i, '');
        const decoded = jwt.verify(trimmedToken, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.id;
        return userId;
    }
    catch(error){
        console.error("Error extracting user ID from request:", error);
        return null;
    }
};


export {
    getUserIdFromRequest
}
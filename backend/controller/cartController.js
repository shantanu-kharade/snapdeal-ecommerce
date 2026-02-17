import { addToCartService, removeFromCartService, getCartItemsService } from '../service/cartService.js';
import { authenticateToken } from '../middleware/middleware.js';

const addToCart = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const cartItem = await addToCartService(req,res);
        res.send(cartItem);
    }
    catch(error){
        res.send(error.message);
    }
}


const getCartItems = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const cartItems = await getCartItemsService(req,res);
        res.send(cartItems);
    }
    catch(error){
        res.send(error.message);
    }
}


const removeFromCart = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const cartItem = await removeFromCartService(req,res);
        res.send(cartItem);
    }
    catch(error){
        res.send(error.message);
    }
}

export {
    addToCart,
    removeFromCart,
    getCartItems
}
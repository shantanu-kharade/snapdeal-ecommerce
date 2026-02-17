import cartModel from '../model/cartModel.js';
import productModel from '../model/productModel.js';
import { getUserIdFromRequest } from '../helper/helper.js';

const addToCartService = async (req, res) => {
    try{
        const userId = getUserIdFromRequest(req);
        const { productId, quantity } = req.body;
        const product = await productModel.findOne({ _id: productId, isDeleted: false });
        if (!product) {
            throw new Error('Product not found');
        }


        if(product.stock < quantity){
            throw new Error('Insufficient stock for the product');
        }

        let cart = await cartModel.findOne({ userId: userId });
        if (!cart) {
            cart = new cartModel({ userId: userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity = quantity;
        } else {
            cart.products.push({ productId: productId, quantity: quantity });
        }

        const updatedCart = await cart.save();
        return updatedCart;
    }
    catch(error){
        res.send(error.message);
    }
}


const removeFromCartService = async (req, res) => {
    try{
        const userId = getUserIdFromRequest(req);
        const { productId } = req.body;

        let cart = await cartModel.findOne({ userId: userId });
        if (!cart) {
            throw new Error('Cart not found for user');
        }
        
        //remove the product permanently from cart
        cart.products = cart.products.filter(item => item.productId.toString() !== productId);

        const updatedCart = await cart.save();
        return updatedCart;
    }
    catch(error){
        res.send(error.message);
    }
}


const getCartItemsService = async (req, res) => {
    try{
        const userId = getUserIdFromRequest(req);
        let cart = await cartModel.findOne({ userId: userId }).populate('products.productId');
        if (!cart) {
            throw new Error('Cart not found for user');
        }
        return cart;
    }
    catch(error){
        res.send(error.message);
    }
}

export {
    addToCartService,
    removeFromCartService,
    getCartItemsService
}
import Router from 'express'
import { removeFromCart, addToCart, getCartItems } from '../controller/cartController.js'

const cartRouter = Router();

cartRouter.post('/add' , addToCart);
cartRouter.get('/', getCartItems);
cartRouter.post('/remove' , removeFromCart);

export default cartRouter;
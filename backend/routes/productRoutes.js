import Router from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/productController.js';

const productRouter = Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductById);

productRouter.post('/', createProduct);

productRouter.put('/', updateProduct);

productRouter.delete('/', deleteProduct);


export default productRouter
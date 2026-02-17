import {  getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService, } from '../service/productService.js';
import { authenticateToken, authorizeRole } from '../middleware/middleware.js';

const createProduct = async(req,res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        console.log("before authorize");
        const authorized = await authorizeRole(['admin'], req);
        console.log("after authorize");
        if (!authorized) {
            return res.send("User not authorized");
        }
        const product = await createProductService(req,res);
        res.send(product);
    }
    catch(error){
        res.send(error.message);
    }
}


const updateProduct = async(req,res) => {
    try{

        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const authorized = await authorizeRole(['admin'], req);
        if (!authorized) {
            return res.send("User not authorized");
        }

        const product = await updateProductService(req,res);
        res.send(product);
    }
    catch(error){
        res.send(error.message);
    }
}

const getAllProducts = async (req,res) => {
    try{

        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const product = await getAllProductsService(req,res);
        res.send(product);
    }
    catch(error){
        res.send(error.message);
    }
}

const getProductById = async(req,res) => {
    try{
        const product = await getProductByIdService(req,res);
        res.send(product);
    }
    catch(error){
        res.send(error.message);
    }

}





const deleteProduct = async(req,res) => {
    try{
        const product = await deleteProductService(req,res);
        res.send(product);
    }
    catch(error){
        res.send(error.message);
    }
}


export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
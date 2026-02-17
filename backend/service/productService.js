import { getUserIdFromRequest } from '../helper/helper.js';
import ProductModel from '../model/productModel.js';

const createProductService= async (req,res) => {
    try{
        const userId = getUserIdFromRequest(req);
        const { formData } = req.body;

        const product = new ProductModel({
            productName: formData.productName,
            description: formData.description,
            price: formData.price,
            category: formData.category,
            stock: formData.stock,
            imageUrl: formData.imageUrl,
            createdBy: userId
        })

        const savedProduct = await product.save();
        return savedProduct;
    }
    catch(error){
        res.send(error.message);
    }
}


const updateProductService = async(req,res) => {
    try{
        const productId = req.query.id;
        console.log("productId", productId);

        const updateData = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
        if(!updatedProduct){
            return res.status(404).send("Product not found");
        }
        return updatedProduct;
    }

    catch(error){
        res.send(error.message); 
    }
}


const getAllProductsService = async (req,res) => {
    try{
        //fetch all products from db except deleted ones
        const products = await ProductModel.find({ isDeleted: false });
        return products;
    }
    catch(error){
        res.send(error.message);
    }
}

const getProductByIdService = async (req,res) => {
    try{
        const productId = req.query.id;
        const product = await ProductModel.findById(productId);
        if(!product){
            return res.status(404).send("Product not found");
        }
        return product;
    }
    catch(error){
        res.send(error.message);
    }
}



const deleteProductService = async(req,res) => {
    try{
        const productId = req.query.id;
        //soft delete - set a flag
        //hard delete - remove from db
        const product = await ProductModel.findById(productId);
        console.log("product", product);
        if(!product){
            return res.status(404).send("Product not found");
        }

        product.isDeleted = true;
        // product.deletedAt = new Date();

        const deletedProduct = await product.save();
        return deletedProduct;
    }
    catch(error){
        res.send(error.message); 
    }
}


export {
    getAllProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
}
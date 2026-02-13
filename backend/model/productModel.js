import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    stock : {type : Number, required : true},
    imageUrl : {type : String, required : true},
    category : {type : String, required : true},
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now},
    isDeleted : {type : Boolean, default : false},
}, {timestamps : true});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
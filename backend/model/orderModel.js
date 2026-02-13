import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    
    products : [{
        productId : {type : mongoose.Schema.Types.ObjectId, ref : 'Product', required : true},
        quantity : {type : Number, required : true, default : 1}
    }],
   
    totalAmount : {type : Number, required : true},
    orderStatus : {type : String, enum : ['pending', 'shipped', 'delivered', 'cancelled', 'returned'], default : 'pending'},
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now}
}, {timestamps : true});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
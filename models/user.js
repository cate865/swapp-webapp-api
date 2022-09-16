import pkg from 'mongoose';
const { Schema, model } = pkg;

const ProductSchema  = new Schema({
    name:{
        type:String,
        
    },
    description:{
        type: String,
        
    },
    deliveryAddress:{
        type: String,
        
    },
    images:{
        [{data: Buffer,
        contentType: String}]
    },
    forTrade:{
        type: Boolean
    },
    donor:{
        type: Number
    },
    receiver:{
        type:Number
    }


});

const Product = model('Product', ProductSchema);

export default Product
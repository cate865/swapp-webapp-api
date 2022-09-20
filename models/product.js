import pkg from 'mongoose';
const { Schema, model } = pkg;

const ProductSchema = new Schema({
    name: String,
    description: String,
    deliveryAddress: String,

    // eslint-disable-next-line no-undef
    images: [Buffer],

    forTrade: Boolean,
    // eslint-disable-next-line no-undef
    donor: ObjectId,
    booked: {
        type: Boolean,
        default: false
    },
    exchanged:{
        type: Boolean,
        default: false
    }



});

const Product = model('Product', ProductSchema);

// Product.createCollection().then(function(collection) {
//   console.log('Product Collection is created!');
// });

export default Product
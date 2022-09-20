import pkg from 'mongoose';
const { Schema, model } = pkg;

const OfferSchema = new Schema({
    interestedProduct: Schema.Types.ObjectId,
    exchangeProductName: String,
    description: String,
    images: [Schema.Types.Buffer],
    address: String,
    accepted: {
        type: Boolean,
        default: false
    },
    exchanged: {
        type: Boolean,
        default: false
    }

})

const Offer = model('Offer', OfferSchema);

// Offer.createCollection().then(function(collection) {
//   console.log('Offer Collection is created!');
// });

export default Offer

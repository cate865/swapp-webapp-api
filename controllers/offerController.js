import Offer from "../models/offer.js";
import Product from "../models/product.js";
import { populateImages } from "../middlewares/fileConfig.js";

// Make a Trade Offer
export async function makeTradeOffer(req, res) {
    const offerDoc = new Offer({
        interestedProduct: req.body.interestedProduct,
        exchangeProductName: req.body.exchangeProductName,
        description: req.body.description,
        address: req.body.address,
    });



    if (req.files) {
        offerDoc.images = await populateImages(req.files)
    }
    try {

        let offer = await offerDoc.save();
        if (offer) {
            res.status(200).json({
                message: "Offer made successfully",
                data: offer
            })
        } else {
            res.status(200).json({
                message: "Offer not saved"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Ooops...something is wrong!"
        })
    }


}

// Accept Trade Offer
export async function acceptOffer(req, res) {
    try {
        let offer = await Offer.findById(req.params.id);
        let updatedOffer = await Offer.findByIdAndUpdate(req.params.id, { accepted: true });
        if (updatedOffer) {

            let updatedProduct = await Product.findByIdAndUpdate(offer.interestedProduct, { booked: true });
            return res.status(200).json({
                message: "Offer accepted. Updated successfully",
                data: updatedOffer, updatedProduct
            })
        }
       
    } catch (error) {
        return res.status(500).json({
            message: "Oops! Something must be wrong"
        })
    }

}
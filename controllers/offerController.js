import Offer from "../models/offer";
import Product from "../models/product";

// Make a Trade Offer
export async function makeTradeOffer(req, res) {
    const offerDoc = new Offer(req.body);
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

// Accept or Reject Trade Offer
export async function respondToOffer(req, res) {
    try {
        let offer = await Offer.findById(req.params.id);
        if (req.body.accepted === true) {
            let updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body);
            if (updatedOffer) {

                let updatedProduct = await Product.findByIdAndUpdate(offer.interestedProduct, { booked: true });
                res.status(200).json({
                    message: "Offer accepted. Updated successfully",
                    data: updatedOffer, updatedProduct
                })
            }

        } else {
            res.status(200).json({
                message: "Offer rejected. Details maintained"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Oops! Something must be wrong"
        })
    }

}
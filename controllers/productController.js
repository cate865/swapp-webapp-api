import Product from "../models/product.js";
import { populateImages } from "../middlewares/fileConfig.js";

// Post a product
export async function postProduct(req, res) {
    
    const productDoc = new Product({
        name: req.body.name,
        description: req.body.description,
        deliveryAddress: req.body.deliveryAddress,

        // eslint-disable-next-line no-undef

        forTrade: req.body.forTrade,
        // eslint-disable-next-line no-undef
        donor: req.body.donor,
        
    })

    if (req.files) {
        productDoc.images = await populateImages(req.files)
    }

    try {
        let newProduct = await productDoc.save();
        return res.status(201).json({
            message: " Product created successfully",
            data: newProduct
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Oops! Something must be wrong...",

        })

    }

}

// Deliver a product
export async function markProductAsDelivered(req, res) {
    try {
        let product = await Product.findByIdAndUpdate(req.params.id, { exchanged: true });
        if (product) {
            return res.status(200).json({
                message: "Product marked as delivered!",
                
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Oops! Something must be wrong!"
        })
    }

}


// View products for trade
export async function viewProductsForTrade(req, res) {
    try {
        let product = await Product.find({ forTrade: true });
        if (product) {
            res.status(200).json({
                message: "Products retrieved successfully",
                data: product
            })
        } else {
            res.status(200).json({
                message: "No products found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Oops! Something must be wrong!"
        })
    }
}

// View Products for donation
export async function viewProductsForDonation(req, res) {
    try {
        let product = await Product.find({ forTrade: false });
        if (product) {
            res.status(200).json({
                message: "Products retrieved successfully",
                data: product
            })
        } else {
            res.status(200).json({
                message: "No products found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Oops! Something must be wrong!"
        })
    }
}

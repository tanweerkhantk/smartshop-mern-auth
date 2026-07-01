const Cart = require("../models/Cart")

//add to cart
exports.addToCart = async(req, res) => {
    try {
        if(!req.session || !req.session.user){
            return res.status(401).json({
                message: "Unauthorized - Please login first"
            })
        }
        const { productId } = req.body
        const cart = await Cart.create({ user: req.session.user.id, product: productId})
        res.status(201).json({ message:"Product Add To Cart", cart})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

//get user cart
exports.getCart = async(req, res) => {
    try {
         if(!req.session || !req.session.user){
            return res.status(401).json({
                message: "Unauthorized - Please login first"
            })
        }
        const cart = await Cart.find({ user: req.session.user.id}).populate("product")
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}


//remove cart item
exports.deleteCart = async(req, res) => {
    try {
        
        const cart = await Cart.findByIdAndDelete(req.params.id)
        res.json({ message: "Item removed"})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}



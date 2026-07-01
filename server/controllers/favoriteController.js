const Favorite = require("../models/Favorite")

//Add favorite
exports.addFavorite = async(req, res) => {
    try {
        const { productId } = req.body
        const favorite = await Favorite.create({ user: req.session.user.id, product: productId})
        res.status(201).json({message: "Product Add to Favorite", favorite})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}


//get favorite
exports.getFavorite = async(req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.session.user.id}).populate("product")
        res.json(favorites)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}



//delete favorite
exports.deleteFavorite = async(req, res) => {
    try {
        if(!req.session || !req.session.user){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const favorite = await Favorite.findOneAndDelete({
            _id: req.params.id, 
            user: req.session.user.id
        })
        if(!favorite){
            return res.status(404).json({
                message: "Favorite not found"
            })
        }
        res.json({message: "Favorite removed"})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

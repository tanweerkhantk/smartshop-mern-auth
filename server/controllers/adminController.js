const User = require("../models/User")
const Product = require("../models/Product")
const Cart = require("../models/Cart")

exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments()
        const totalProducts = await Product.countDocuments()
        const totalCartItems = await Cart.countDocuments()

        res.json({
            totalUsers,
            totalProducts,
            totalCartItems
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
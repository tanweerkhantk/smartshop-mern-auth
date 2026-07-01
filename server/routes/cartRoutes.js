const express = require("express")

const router = express.Router()

const { addToCart, getCart, deleteCart } = require("../controllers/cartController")

const authMiddleware = require("../middleware/authMiddleware")


router.post("/add", authMiddleware, addToCart)
router.get("/", authMiddleware, getCart)
router.delete("/:id", authMiddleware, deleteCart)

module.exports = router


const express = require("express")

const router = express.Router()

const { addFavorite, getFavorite, deleteFavorite } = require("../controllers/favoriteController")

const authMiddleware = require("../middleware/authMiddleware")


router.post("/add", authMiddleware, addFavorite)
router.get("/", authMiddleware, getFavorite)
router.delete("/:id", authMiddleware, deleteFavorite)

module.exports = router


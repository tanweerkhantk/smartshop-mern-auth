const express = require("express")

const router = express.Router()

const { createProduct, getProducts ,getProduct, updateProduct, deleteProduct } = require("../controllers/productController")

const authMiddleware = require("../middleware/authMiddleware")

const IsAdmin = require("../middleware/roleMiddleware")
const isAdmin = require("../middleware/roleMiddleware")

const upload = require("../middleware/upload")

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", authMiddleware, isAdmin, upload.single("image"), createProduct)
router.put("/:id", authMiddleware, isAdmin, upload.single("image"), updateProduct)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router


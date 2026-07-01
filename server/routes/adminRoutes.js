const express = require("express")
const router = express.Router()



const authMiddleware = require("../middleware/authMiddleware")

const isAdmin = require("../middleware/roleMiddleware")
const { getDashboard } = require("../controllers/adminController")

router.get("/dashboard", authMiddleware, isAdmin, getDashboard)

module.exports = router

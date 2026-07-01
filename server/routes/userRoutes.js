const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")
const isAdmin = require("../middleware/roleMiddleware")

const { getUsers, updateRole, deleteUser } = require("../controllers/userController")

router.get("/", authMiddleware, isAdmin, getUsers)
router.put("/:id/role", authMiddleware, isAdmin, updateRole)
router.delete("/:id", authMiddleware, isAdmin, deleteUser)

module.exports = router;

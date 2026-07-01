
const express = require("express")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const favoriteRoutes = require("./routes/favoriteRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")
const path = require("path")


const app = express()
app.set("trust proxy", 1)

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use(cookieParser())

app.use(session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave:false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
})
)
 
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/favorites", favoriteRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/users", userRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

module.exports = app
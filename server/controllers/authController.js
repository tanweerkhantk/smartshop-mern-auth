const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const exists = await User.findOne({ email })
        if(exists){
            return res.status(400).json({ message: "Email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword, role})
        const userResponse = {
            id: user._id,
            name: user.name,
            email:user.email,
            role:user.role
        }
        res.status(201).json(userResponse)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ message: "Invalid Email "})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password"})
        }

        req.session.user = {
            id: user._id,
            role: user.role
        }
        console.log("Session Set:", req.session.user)
        res.json({
            message: "Login Success",
            user
        })
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.clearCookie("connect.sid")

    res.json({ message: "Logout Success"})
}

exports.profile = async(req, res) => {
    try {
        if(!req.session.user){
            return res.status(401).json({
                message: "Unauthorized"
        })
    }
    const user = await User.findById(req.session.user.id).select("-password")
    if(!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    res.json(user)
    } catch (error) {
        
    }
}
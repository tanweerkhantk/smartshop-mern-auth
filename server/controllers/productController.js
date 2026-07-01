const Product = require("../models/Product")
const fs = require("fs")
const path = require("path")

//create product (Admin)
exports.createProduct = async(req, res) => {
    try {
        const { title, description, price, image} = req.body
        const product = await Product.create({ title: req.body.title, 
            description: req.body.description, 
            price: req.body.price,
            image: req.file.filename})
        res.status(201).json({message:"Product Created Successfully", product})
    } catch (error) {
        res.status(500).json({ message:error.message})
    }
}

//get all products
exports.getProducts = async(req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
         res.status(500).json({ message:error.message})
    }
}

//get single products
exports.getProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({ message: "Product not found"})
        }
        res.json(product)
    } catch (error) {
         res.status(500).json({ message:error.message})
    }
}

//update product
exports.updateProduct = async(req, res) => {
    
    try {

         const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                message: "Product not found",
            })
        }

        if(req.file){
        if(product.image){
            const oldImage = path.join(__dirname, "..", "uploads", product.image)
            if(fs.existsSync(oldImage)){
                fs.unlinkSync(oldImage)
            }
        }
        product.image = req.file.filename
    }

        // const updateData = {
        //     title: req.body.title,
        //     description: req.body.description,
        //     price: req.body.price,
        // }

        product.title = req.body.title,
        product.description = req.body.description,
        product.price = req.body.price,

        await product.save()

        // if(req.file) {
        //     updateData.image = req.file.filename
        // }

        // const product = await Product.findByIdAndUpdate(req.params.id, updateData, {new: true})
        res.json({message: "Product Update Successfully", product})
    } catch (error) {
         res.status(500).json({ message:error.message})
    }
}

//delete product
exports.deleteProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                message: "Product not found",
            })
        }

        if(product.image){
            const imagePath = path.join(__dirname, "..", "uploads", product.image)
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        }


        await Product.findByIdAndDelete(req.params.id)
        res.json({message: "Product Deleted"})
    } catch (error) {
         res.status(500).json({ message:error.message})
    }
}
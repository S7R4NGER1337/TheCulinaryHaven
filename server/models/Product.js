const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
const mongoose = require('mongoose')

const ALLOWED_CATEGORIES = ['Appetizers', 'MainCourses', 'Desserts', 'Drinks']

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 200 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: ALLOWED_CATEGORIES },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    image: { type: String, required: true, trim: true }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product

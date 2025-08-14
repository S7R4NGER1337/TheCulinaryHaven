const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('./models/Product')

app.use(express.urlencoded())
app.use(express.json())

router.get('/products', async (req,res) => {
    const allProducts = await Product.find()
    
    res.json(allProducts)
    res.end()
})

router.get('/products/:category', async (req, res) => {
    const category = req.params.category
    const productsByCategory = await Product.find({category: category})

    res.json(productsByCategory)
    res.end()
})

mongoose.connect('mongodb://localhost:27017/TheCulinaryHaven')
    .then(() => console.log('Db connected'))
    .catch(error => console.log(error))

app.use(router)
app.listen(3030, () => console.log('test'))
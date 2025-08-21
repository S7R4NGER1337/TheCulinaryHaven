const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('./models/Product')
const cors = require('cors')
require('dotenv').config()

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

router.get('/products', async (req, res) => {
    const allProducts = await Product.find()

    res.send(allProducts)
    res.end()
})

router.get('/products/:id', async (req, res) => {
    const productId = req.params.id
    const productData = await Product.findById(productId)

    res.send(productData)
    res.end()
})

router.get('/products/category/:category', async (req, res) => {
    const category = req.params.category
    const productsByCategory = await Product.find({ category: category })

    res.json(productsByCategory)
    res.end()
})

router.post('/products/create', async (req, res) => {
    const data = req.body
    const authToken = req.headers.authorization
    const adminToken = process.env.ADMIN_AUTHTOKEN

    if (authToken === adminToken) {
        const createdProduct = await Product.create(data)
        res.send(createdProduct)
    } else {
        res.send('You need to be an admin')
    }

    res.end()
})

router.get('/products/delete/:id', async (req, res) => {
    const productId = req.params.id
    const authToken = req.headers.authorization
    const adminToken = process.env.ADMIN_AUTHTOKEN

    if (authToken === adminToken) {
        const deletedProduct = await Product.findByIdAndDelete(productId)
        res.send(deletedProduct)
    } else {
        res.send('You need to be an admin')
    }

    res.end()
})

router.post('/products/edit/:id', async (req, res) => {
    const productId = req.params.id
    const newProductData = req.body
    const authToken = req.headers.authorization
    const adminToken = process.env.ADMIN_AUTHTOKEN

    if (authToken === adminToken) {
        const editedProduct = await Product.findByIdAndUpdate(productId, newProductData, { new: true })
        res.send(editedProduct)
    } else {
        res.send('You need to be an admin')
    }

    res.end()
})

router.post('/admin/login', async (req, res) => {
    const adminToken = process.env.ADMIN_AUTHTOKEN
    const adminPassword = process.env.ADMIN_PASSWORD
    const adminUsername = process.env.ADMIN_USERNAME
    const data = req.body

    if (data.userName === adminUsername && data.password === adminPassword) {
        res.send(adminToken)
    } else {
        res.send('no')
    }

    res.end()
})

mongoose.connect('mongodb://localhost:27017/TheCulinaryHaven')
    .then(() => console.log('Db connected'))
    .catch(error => console.log(error))

app.use(router)
app.listen(3030, () => console.log('test'))
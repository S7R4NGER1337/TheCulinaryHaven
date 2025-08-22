const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('./models/Product')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Admin = require('./models/Admin')
const bcrypt = require('bcrypt')

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())
app.use(cookieParser());

const ACCESS_TTL = '30m';
const REFRESH_TTL = '30d';

function signAccess(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
}
function signRefresh(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'none',
    path: '/admin/refresh',
    maxAge: 30 * 24 * 60 * 60 * 1000
};

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

router.get('/check/:token', async (req, res) => {
    const token = req.params.token
    const adminToken = process.env.ADMIN_AUTHTOKEN

    res.send(token === adminToken)
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
    const { username, passwordHash } = req.body
    const user = await Admin.findOne({ username })

    if (!user) return res.status(400).json({ msg: "Невалиден имейл" })

    const isMatch = await bcrypt.compare(passwordHash, user.passwordHash)
    if (!isMatch) return res.status(400).json({ msg: "Грешна парола" })

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "15m" })
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

    res.cookie("refreshToken", refreshToken, refreshCookieOptions)
    res.json({ accessToken })
})

app.post("/auth/refresh", (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    )

    res.json({ accessToken })
  })
})

mongoose.connect('mongodb://localhost:27017/TheCulinaryHaven')
    .then(() => console.log('Db connected'))
    .catch(error => console.log(error))

app.use(router)
app.listen(3030, () => console.log('test'))
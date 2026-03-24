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
const helmet = require('helmet')

// Validate required environment variables at startup
const requiredEnvVars = ['ACCESS_SECRET', 'REFRESH_SECRET', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === 'production';

const accessCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000
};

const refreshCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

// Simple in-memory rate limiter for login endpoint
const loginAttempts = new Map();
function loginRateLimiter(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const maxAttempts = 10;

    const entry = loginAttempts.get(ip);
    if (!entry || now > entry.resetAt) {
        loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
        return next();
    }
    if (entry.count >= maxAttempts) {
        return res.status(429).json({ msg: 'Too many login attempts. Please try again later.' });
    }
    entry.count++;
    next();
}

function verifyAdmin(req, res, next) {
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

const ALLOWED_CATEGORIES = ['Appetizers', 'MainCourses', 'Desserts', 'Drinks'];

function validateProduct(body) {
    const { name, description, image, category, price } = body;
    if (!name || typeof name !== 'string' || name.trim() === '') return 'Name is required';
    if (!description || typeof description !== 'string' || description.trim() === '') return 'Description is required';
    if (!image || typeof image !== 'string' || image.trim() === '') return 'Image is required';
    if (!category || !ALLOWED_CATEGORIES.includes(category)) return 'Invalid category';
    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) return 'Price must be a non-negative number';
    return null;
}

// Health check endpoint
app.get('/health', async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ status: 'ok', db: dbStatus });
});

// NOTE: /products/category/:category must be defined BEFORE /products/:id
// to prevent "category" from being captured as an :id parameter
router.get('/products', async (req, res, next) => {
    try {
        const allProducts = await Product.find()
        res.json(allProducts)
    } catch (err) {
        next(err)
    }
})

router.get('/products/category/:category', async (req, res, next) => {
    try {
        if (!ALLOWED_CATEGORIES.includes(req.params.category)) {
            return res.status(400).json({ msg: 'Invalid category' });
        }
        const productsByCategory = await Product.find({ category: req.params.category })
        res.json(productsByCategory)
    } catch (err) {
        next(err)
    }
})

router.get('/products/:id', async (req, res, next) => {
    try {
        if (!isValidObjectId(req.params.id)) return res.status(400).json({ msg: 'Invalid product ID' });
        const productData = await Product.findById(req.params.id)
        if (!productData) return res.status(404).json({ msg: 'Product not found' });
        res.json(productData)
    } catch (err) {
        next(err)
    }
})

router.post('/products/create', verifyAdmin, async (req, res, next) => {
    try {
        const validationError = validateProduct(req.body);
        if (validationError) return res.status(400).json({ msg: validationError });

        const { name, description, image, category, price } = req.body;
        const createdProduct = await Product.create({ name, description, image, category, price: Number(price) });
        res.status(201).json(createdProduct);
    } catch (err) {
        next(err)
    }
});

router.delete('/products/:id', verifyAdmin, async (req, res, next) => {
    try {
        if (!isValidObjectId(req.params.id)) return res.status(400).json({ msg: 'Invalid product ID' });
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ msg: 'Product not found' });
        res.json(deletedProduct);
    } catch (err) {
        next(err)
    }
});

router.post('/products/edit/:id', verifyAdmin, async (req, res, next) => {
    try {
        if (!isValidObjectId(req.params.id)) return res.status(400).json({ msg: 'Invalid product ID' });

        const validationError = validateProduct(req.body);
        if (validationError) return res.status(400).json({ msg: validationError });

        const { name, description, image, category, price } = req.body;
        const editedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, image, category, price: Number(price) },
            { new: true, runValidators: true }
        );
        if (!editedProduct) return res.status(404).json({ msg: 'Product not found' });
        res.json(editedProduct);
    } catch (err) {
        next(err)
    }
});

router.post('/admin/login', loginRateLimiter, async (req, res, next) => {
    try {
        const { username, passwordHash } = req.body;
        if (!username || !passwordHash) return res.status(400).json({ msg: 'Username and password are required' });

        const user = await Admin.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid name or password' });

        const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid name or password' });

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        res.cookie('accessToken', accessToken, accessCookieOptions);
        res.cookie('refreshToken', refreshToken, refreshCookieOptions);
        res.json({ msg: 'Logged in' });
    } catch (err) {
        next(err)
    }
});

app.post('/auth/logout', (req, res) => {
    res.clearCookie('accessToken', { ...accessCookieOptions, maxAge: 0 });
    res.clearCookie('refreshToken', { ...refreshCookieOptions, maxAge: 0 });
    res.json({ msg: 'Logged out' });
});

app.post('/auth/refresh', (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
        res.cookie('accessToken', accessToken, accessCookieOptions);
        res.json({ msg: 'Access token refreshed' });
    });
});

router.get('/admin/check', verifyAdmin, (req, res) => {
    res.sendStatus(200);
});

app.use(router)

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Internal server error' });
});

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('DB connected');
        const PORT = process.env.PORT || 3030;
        const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

        // Graceful shutdown
        function shutdown() {
            console.log('Shutting down gracefully...');
            server.close(() => {
                mongoose.connection.close(false).then(() => {
                    console.log('DB connection closed');
                    process.exit(0);
                });
            });
        }

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    });

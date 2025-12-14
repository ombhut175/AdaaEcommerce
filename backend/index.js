/**
 * Express Server - AdaaEcommerce Backend
 * 
 * Main entry point for the e-commerce API server.
 * Uses MongoDB, Firebase Admin SDK, and Socket.IO.
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('node:path');
const { createServer } = require('node:http');
const admin = require('firebase-admin');

// Routes
const authRouter = require('./routes/auth');
const googleRoutes = require('./routes/googleRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orderRoutes');
const productRouter = require('./routes/products');
const paymentRouter = require('./routes/payment');
const trackingRoutes = require('./routes/tracking');
const deliveryRouter = require('./routes/delivery');
const adminRouter = require('./routes/adminRoutes');
const dealerRouter = require('./routes/dealerRoutes');
const addressRouter = require('./routes/address');
const wishListRouter = require('./routes/wishlist');

// Controllers
const { giveStaticImages } = require('./controllers/admin');

// Middlewares
const { checkForDealerAuthentication } = require('./middlewares/dealer');
const { checkForAdminAuthentication } = require('./middlewares/admin');

// Services
const { initSocket } = require('./services/socket');

// Configuration
const PORT = process.env.PORT || 5000;

// Debug: Check Firebase env variables
console.log('🔧 Environment Check:');
console.log('  FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Not set');
console.log('  FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Not set');
console.log('  FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅ Set' : '❌ Not set');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connected successfully');

        const app = express();
        const server = createServer(app);

        // Initialize Socket.IO
        initSocket(server);

        // Initialize Firebase Admin SDK
        initializeFirebase();

        // Setup Middlewares
        setupMiddlewares(app);

        // Setup Routes
        setupRoutes(app);

        // Start Server
        app.listen(PORT, (err) => {
            if (err) {
                console.error(`❌ Server error: ${err}`);
            } else {
                console.log(`🚀 Server running on port ${PORT}`);
            }
        });
    })
    .catch((err) => {
        console.error(`❌ MongoDB connection failed: ${err}`);
    });

/**
 * Initialize Firebase Admin SDK
 */
function initializeFirebase() {
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
        console.error('⚠️  Firebase Admin SDK initialization failed!');
        console.error('Missing environment variables:');
        if (!FIREBASE_PROJECT_ID) console.error('  - FIREBASE_PROJECT_ID');
        if (!FIREBASE_CLIENT_EMAIL) console.error('  - FIREBASE_CLIENT_EMAIL');
        if (!FIREBASE_PRIVATE_KEY) console.error('  - FIREBASE_PRIVATE_KEY');
        return;
    }

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });
    console.log('✅ Firebase Admin SDK initialized');
}

/**
 * Setup Express Middlewares
 */
function setupMiddlewares(app) {
    // Cookie Parser
    app.use(cookieParser());

    // CORS Configuration
    app.use(cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    }));

    // Session Configuration
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY || 'default-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }
    }));

    // Body Parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

/**
 * Setup API Routes
 */
function setupRoutes(app) {
    // Static Files
    app.use('/api/static', express.static(path.join(__dirname, 'public/staticPictures')));
    app.get('/api/getStaticImages', giveStaticImages);

    // Authentication Routes
    app.use('/api/google', googleRoutes);
    app.use('/api', authRouter);

    // User Routes
    app.use('/api', addressRouter);
    app.use('/api/cart', cartRoutes);
    app.use('/api/wishlist', wishListRouter);
    app.use('/api/orders', orderRoutes);
    app.use('/api/user', userRoutes);

    // Product Routes
    app.use('/api/products', productRouter);

    // Dealer Routes (Protected)
    app.use('/api/dealer', checkForDealerAuthentication, dealerRouter);

    // Admin Routes (Protected)
    app.use('/api/admin', checkForAdminAuthentication, adminRouter);

    // Payment & Delivery Routes
    app.use('/api', paymentRouter);
    app.use('/api/tracking', trackingRoutes);
    app.use('/api', deliveryRouter);

    // Health Check
    app.get('/', (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'AdaaEcommerce API is running'
        });
    });

    // Clear Cookie
    app.delete('/clearCookie', (req, res) => {
        res.clearCookie('userId');
        res.clearCookie('authToken');
        return res.status(200).json({
            success: true,
            message: 'Cookies cleared'
        });
    });
}
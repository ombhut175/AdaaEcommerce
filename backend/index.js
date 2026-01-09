/**
 * Express Server - AdaaEcommerce Backend
 * 
 * Main entry point for the e-commerce API server.
 * Uses MongoDB, Firebase Admin SDK, and Socket.IO.
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const authRouter = require('./routes/auth');
const requireLogin = require('./middlewares/requiredLogin');
>>>>>>> origin
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
<<<<<<< HEAD
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
=======
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/orderRoutes");
const path = require("node:path");
const productRouter = require('./routes/products')
const {validateLogin} = require("./middlewares/requiredLogin");
const {checkForDealerAuthentication} = require("./middlewares/dealer");
const paymentRouter =require('./routes/payment')
const trackingRoutes = require('./routes/tracking')
const deliveryRouter = require("./routes/delivery")
const adminRouter = require("./routes/adminRoutes");
const {giveStaticImages} = require("./controllers/admin");
const dealerRouter = require("./routes/dealerRoutes");
const addressRouter = require('./routes/address');
const wishListRouter = require('./routes/wishlist');
const { createServer } = require('node:http');
const { initSocket } = require("./services/socket");
const {checkForAdminAuthentication} = require("./middlewares/admin");
const {checkForUserAuthentication} = require("./middlewares/user");

// # Express Server Documentation

// ## Overview
// This is the main server file that initializes and configures an Express.js application with MongoDB, Socket.IO, and various middleware integrations. The server handles authentication, user management, product management, and various other e-commerce functionalities.

// ## Dependencies
// - `dotenv`: Environment variable management
// - `express`: Web application framework
// - `mongoose`: MongoDB ODM
// - `cookie-parser`: Cookie parsing middleware
// - `cors`: Cross-Origin Resource Sharing
// - `passport`: Authentication middleware
// - `express-session`: Session middleware
// - `socket.io`: Real-time bidirectional communication

// ## Configuration
// - Server runs on the port specified in environment variable `PORT`
// - MongoDB connection URL is specified in `MONGO_URL` environment variable
// - Session secret key is specified in `SESSION_SECRET_KEY` environment variable
// - CORS is configured to allow requests from `CLIENT_URL_FOR_CORS`

// ## Database Connection
// The application connects to MongoDB using Mongoose before initializing the Express server. On successful connection, it proceeds with server setup and configuration.

// ## Middleware Setup
// 1. **CORS Configuration**
//    - Origins: Specified by `CLIENT_URL_FOR_CORS`
//    - Methods: GET, POST, PUT, DELETE
//    - Credentials: Enabled

// 2. **Session Configuration**
//    - Secret key from environment variables
//    - Session duration: 7 days
//    - Non-resaving of unmodified sessions
//    - Uninitialized sessions are saved

// 3. **Body Parsing**
//    - JSON parsing
//    - URL-encoded data parsing
//    - Cookie parsing

// 4. **Authentication**
//    - Passport initialization
//    - Session support

// ## Routes

// ### Static Files
// - `/api/static`: Serves static files from `public/staticPictures`
// - `/api/getStaticImages`: Retrieves static images

// ### Authentication
// - `/api/google`: Google authentication routes
// - `/api`: General authentication routes

// ### User Management
// - `/api/cart`: Shopping cart operations
// - `/api/wishlist`: Wishlist management
// - `/api/orders`: Order management
// - `/api/user`: User profile operations
// - `/api/address`: Address management

// ### Product Management
// - `/api/products`: Product-related operations

// ### Dealer Operations
// - `/api/dealer`: Dealer-specific routes (requires dealer authentication)

// ### Admin Operations
// - `/api/admin`: Admin-specific routes (requires admin authentication)

// ### Additional Features
// - `/api/tracking`: Product tracking functionality
// - `/api/payment`: Payment processing
// - `/api/delivery`: Delivery management

// ### Utility Routes
// - `/clearCookie`: Clears authentication cookie
// - `/`: Health check endpoint

// ## Security Features
// 1. Role-based Authentication
//    - Admin authentication middleware
//    - Dealer authentication middleware
//    - User authentication middleware

// 2. Session Management
//    - Secure cookie handling
//    - Session persistence
//    - Authentication state management

// ## WebSocket Integration
// - Socket.IO initialization for real-time communication
// - Configured with CORS settings matching the main application

// ## Error Handling
// - MongoDB connection errors are caught and logged
// - Server startup errors are handled and logged

// ## Usage
// 1. Ensure all environment variables are properly set
// 2. Install dependencies using `npm install`
// 3. Start the server using `node index.js`
// 4. Server will initialize MongoDB connection before starting to listen for requests

// ## Environment Variables Required
//configuration--------------------------------------------------
const PORT = process.env.PORT;



//mongodb connection----------------------------------------------------------------
>>>>>>> origin

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
<<<<<<< HEAD
        const server = createServer(app);

        // Initialize Socket.IO
        initSocket(server);
=======

        const server = createServer(app);

        // Initialize Socket.IO
        initSocket(server);

        //middlewares
        app.use(cors({
            origin: process.env.CLIENT_URL, // Specify your frontend's origin
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
            credentials: true, // Allow credentials (cookies, authentication headers, etc.)
        }));
        // app.use(cors())

        app.use(cookieParser());
>>>>>>> origin

        // Initialize Firebase Admin SDK
        initializeFirebase();

<<<<<<< HEAD
        // Setup Middlewares
        setupMiddlewares(app);
=======
        //static files
        app.use('/api/static', express.static(path.join(__dirname, 'public/staticPictures')));
        app.get('/api/getStaticImages',giveStaticImages);

        app.use('/api/products', productRouter);

>>>>>>> origin

        // Setup Routes
        setupRoutes(app);

<<<<<<< HEAD
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
=======
        //user middlewares
        // app.use(checkForUserAuthentication);

        app.use('/api',addressRouter)

        // app.get('/api/products',(req,res)=>{
        //     console.log("entered");
        //     return res.status(200).json({message:"Entered"});
        // })
        //verification middlewares

        // app.use('/api',validateLogin);

        //cart middlewares
        app.use('/api/cart', cartRoutes);
        app.use('/api/wishlist',wishListRouter)
        //user middleware

        app.use('/api/orders' ,orderRoutes);
        app.use('/api/user', userRoutes);

        //dealer middlewares
        app.use('/api/dealer',checkForDealerAuthentication,dealerRouter);


        //products middleware

        //admin routes
        app.use('/api/admin' ,checkForAdminAuthentication,adminRouter);


        //checking
        app.get('/', (req, res) => {
            console.log("ok ok");
            return res.status(200).send({message: 'ok'});
        });

        //payment
        app.use('/api',paymentRouter)

        //trackingProducts

        app.use('/api/tracking',trackingRoutes)

        //delivery 
        app.use('/api',deliveryRouter);

        app.delete('/clearCookie', (req, res) => {
            res.clearCookie('authToken');
            res.status(200).json({success:true ,  message: 'Cookie has been cleared' });
          });
        //listen at specific port
        server.listen(PORT, (err) => {
            console.log(err ? `Error is occurred in program : ${err}` : `Server started at ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })
>>>>>>> origin

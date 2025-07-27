require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const requireLogin = require('./middlewares/requiredLogin');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const googleRoutes = require("./routes/googleRoutes");
const passport = require('./services/passport');
const session = require('express-session');
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

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`Mongodb is connected`);
        const app = express();

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

        app.use(
            session({
                secret: process.env.SESSION_SECRET_KEY,
                resave: false,
                saveUninitialized: true,
                cookie: {maxAge: 7 * 24 * 60 * 60 * 1000} // 7 days
            })
        );
        // Body parsing
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        // Passport initialization
        app.use(passport.initialize());
        app.use(passport.session());

        //static files
        app.use('/api/static', express.static(path.join(__dirname, 'public/staticPictures')));
        app.get('/api/getStaticImages',giveStaticImages);

        app.use('/api/products', productRouter);


        //auth middlewares
        app.use('/api/google', googleRoutes);
        app.use('/api', authRouter)

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
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
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

//configuration--------------------------------------------------
dotenv.config()
const PORT = process.env.PORT;



//mongodb connection----------------------------------------------------------------

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`Mongodb is connected`);
        const app = express();
        //middlewares
        // app.use(cors({
        //     origin: '*', // Allow this specific origin
        //     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
        //     credentials: true // If you're using cookies or authentication
        // }));
        app.use(cors({
            origin: 'http://localhost:5173', // Specify your frontend's origin
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
        //routes

        //auth middlewares
        app.use('/api/google', googleRoutes);
        app.use('/api', authRouter)

        //verification middlewares

        // app.use('/api',validateLogin);

        //cart middlewares
        app.use('/api/cart', cartRoutes);

        //user middleware

        app.use('/api/user', userRoutes);
        app.use('/api/orders' ,orderRoutes);

        //products middleware
        app.use('/api/products', productRouter);


        //checking
        app.get('/', (req, res) => {
            console.log("ok ok");
            return res.status(200).send({message: 'ok'});
        });

        //payment
        app.use('/api/payment',paymentRouter)

        //trackingProducts

        app.use('/api',trackingRoutes)

        //delivery 

        app.use('/api',deliveryRouter)

        //listen at specific port
        app.listen(PORT, (err) => {
            console.log(err ? `Error is occurred in program : ${err}` : `Server started at ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(`mongodb connection failed : ${err}`);
    })
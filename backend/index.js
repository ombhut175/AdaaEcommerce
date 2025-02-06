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
            origin: process.env.CLIENT_URL_FOR_CORS, // Specify your frontend's origin
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
        app.use(checkForUserAuthentication);

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

        app.use('/api/user', userRoutes);
        app.use('/api/orders' ,orderRoutes);

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
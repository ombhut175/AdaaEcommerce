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
const path = require("node:path");
const productRouter = require('./routes/products')

//configuration--------------------------------------------------
dotenv.config()
const PORT = process.env.PORT;

//mongodb connection----------------------------------------------------------------

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`Mongodb is connected`);
        const app = express();
        //middlewares

        app.use(cookieParser());
        app.use(cors({
            origin: 'http://localhost:5173', // Replace with your frontend's URL
            credentials: true,              // Allow cookies to be sent
        }));
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL); // Frontend URL
            res.header('Access-Control-Allow-Credentials', 'true');            // Allow cookies
            next();
        });
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
        app.use('/api/static',express.static(path.join(__dirname, 'public/staticPictures')));
        //routes

        //auth middlewares
        app.use('/api/google', googleRoutes);
        app.use('/api', authRouter)

        //cart middlewares
        app.use('/api/cart', cartRoutes)

        //user middleware

        app.use('/api/user', userRoutes);

        //products middleware
        app.use('/api/products', productRouter);


        //checking
        app.get('/', (req, res) => {
            console.log("ok ok");
            return res.status(200).send({message: 'ok'});
        });

        //listen at specific port
        app.listen(PORT, (err) => {
            if (err) {
                console.log(`Error is occurred in program : ${err}`);

            } else {

                console.log(`Server started at ${PORT}`);

            }
        })
    })
    .catch((err) => {
        console.log(`mongodb connection failed : ${err}`);
    })
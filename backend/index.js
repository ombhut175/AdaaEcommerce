require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRouter = require('./routes/auth');
const requireLogin = require('./middlewares/requiredLogin');
const cookieParser = require('cookie-parser');
//configuration--------------------------------------------------
dotenv.config()
const PORT = process.env.PORT;

//mongodb connection----------------------------------------------------------------

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`Mongodb is connected`);
        const app = express();

        //middlewares

        // Session and CORS
        app.use(
            cors({
                origin: "http://localhost:5173",
                credentials: true
            })
        )
        app.use(cookieParser());
        app.use(
            session({
                secret: process.env.SESSION_SECRET_KEY,
                resave: false,
                saveUninitialized: true,
                cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
            })
        );
        // Body parsing
        app.use(express.json());
        app.use(express.urlencoded());
        // Passport initialization
        app.use(passport.initialize());
        app.use(passport.session());
        //google middleware
        app.use('/api/google',googleRoutes);

        //routes
        app.use('/signup',userRouter)
        app.use('/login',userRouter)
        app.get('/home',requireLogin,(req,res)=>{   
            res.send("kokokok")
        })

        //listen at specific port 
        app.listen(PORT, (err) => {
            if (err) {

                console.log(`Error is occured in program : ${err}`);

            } else {

                console.log(`Server started at ${PORT}`);

            }
        })
    })
    .catch((err) => {
        console.log(`mongodb connection failed : ${err}`);
    })
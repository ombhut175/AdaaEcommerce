const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRouter = require('./routes/user');
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
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(cookieParser());

        //routes
        app.use('/signup',userRouter)
        app.use('/login',userRouter)
        app.get('/home',requireLogin,(req,res)=>{   
            res.send("kokokok")
        })

        //listen at specific port 
        app.listen(PORT,(err)=>{
            if(err){
                
                console.log(`Error is occured in program : ${err}` );
                
            }else{

                console.log(`Server started at ${PORT}`);
            
            }
        })
    })
    .catch((err) => {
        console.log(`mongodb connction failed : ${err}`);
    })
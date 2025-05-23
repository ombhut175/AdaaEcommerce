require('dotenv').config({path: '../.env'});

const {Server} = require('socket.io');

let io;

function initSocket(server){
    console.log("from initSocket");
    io = new Server(server,{
        cors:{
            origin:[process.env.CLIENT_URL,process.env.CLIENT_URL_FOR_CORS],
            credentials: true
        }
    });
    io.on('connection',(socket)=>{
        console.log(`user connected ${socket.id}`);
    })

    return io;
}


function getIo(){
    if (!io){
        throw new Error('socket io not initialized');
    }
    return io;
}


function updateProductsUsingSocketIo(){
    if (io){
        io.emit('products updated');
    }
}

module.exports = {
    initSocket,
    getIo,
    updateProductsUsingSocketIo
}
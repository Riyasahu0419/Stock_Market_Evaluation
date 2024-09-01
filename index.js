const express= require("express")
const connection=require("./config/db")
const server=express()
const userRoute=require("./router/userRoute")
const stockRoute=require("./router/stockRoute")
const orderRoute=require("./router/orderRoute")

require('dotenv').config()

server.use(express.json())
PORT=process.env.PORT || 5000


server.use('/user', userRoute);
server.use('/stock', stockRoute);
server.use('/order', orderRoute);



server.listen(PORT,async()=>{
    try {
        await connection()
        console.log("server connected to database",PORT)
    } catch (error) {
        console.log("server is not connected to database")
    }
})

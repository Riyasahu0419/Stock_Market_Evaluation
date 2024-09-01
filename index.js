const express= require("express")
const connection=require("./config/db")
const server=express()
server.use(express.json())

PORT=5000



server.listen(PORT,async()=>{
    try {
        await connection()
        console.log("server connected to database",PORT)
    } catch (error) {
        console.log("server is not connected to database")
    }
})

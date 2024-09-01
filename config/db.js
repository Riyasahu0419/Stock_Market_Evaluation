require("dotenv").config()
const mongoose= require("mongoose")
const connection= async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected")
    } catch (error) {
        console.log("something wen wrong")
    }
}
module.exports=connection
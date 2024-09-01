const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
    "user":String,
    "stock":String,
    "quantity":String,
    "price":Number,
    "willing":{type:String,enum:["netbanking","cash"]},
    "status":{ type: String, enum: ['open', 'fulfilled', 'cancelled'], default: 'open' }
    
},
{
    versionKey:false
})

const orderModel=mongoose.model("order",orderSchema)
module.exports=orderModel
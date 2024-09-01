const mongoose=require("mongoose")
const stockSchema=mongoose.Schema({
    "name":String,
    "symbol":String,
    "initial_price":Number

},{
    versionKey:false
})


const stockModel=mongoose.model('stock',stockSchema)

module.exports=stockModel
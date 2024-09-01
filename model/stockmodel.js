const mongoose=require("mongoose")
const stockSchema=mongoose.Schema({
    "Stock_name":String,
    "symbol":String,
    "listing_price":Number

},{
    versionKey:false
})


const stockModel=mongoose.model('stock',stockSchema)

module.exports=stockModel
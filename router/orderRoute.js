const express=require("express")
const router=express.Router()
const orderModel=require("../model/ordermodel")
const stockModel=require("../model/stockmodel")
const AuthMiddle=require("../middleware/auth")

router.post("/order",AuthMiddle,async(req,res)=>{
    const { stockId, quantity, price,willing, } = req.body;

  try {
    const stock = await stockModel.findById(stockId);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const order = await orderModel.create({
      user: req.user._id,
      stock: stockId,
      orderType,
      quantity,
      price,
      willing
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})


router.get("/",AuthMiddle,async(req,res)=>{
    try {
        const order = await orderModel.find({ user: req.user._id }).populate('stock', 'name symbol');
        res.json(order);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
})

module.exports=router
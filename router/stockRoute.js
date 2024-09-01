const express=require("express")
const router=express.Router()
const stockModel=require("../model/stockmodel")
const AuthMiddle=require("../middleware/auth")


router.post("/add",AuthMiddle,async(req,res)=>{

    const { name, symbol, initial_price } = req.body;

  try {
    const stockExists = await stockModel.findOne({ symbol });
    if (stockExists) {
      return res.status(400).json({ message: 'Stock already exists' });
    }

    const stock = await stockModel.create({
      name,
      symbol,
      initial_price,
      currentPrice: initial_price,
    });

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})

router.get("/",async(req,res)=>{
    try {
        const stocks = await stockModel.find();
        res.json(stocks);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
})


router.put("/update/:id",AuthMiddle,async(req,res)=>{
    const { name, symbol } = req.body;

  try {
    const stock = await stockModel.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    stock.name = name || stock.name;
    stock.symbol = symbol || stock.symbol;
    
    const updatedStock = await stock.save();
    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})


router.delete("/delete/:id",AuthMiddle,async(req,res)=>{
    try {
        const stock = await stockModel.findById(req.params.id);
    
        if (!stock) {
          return res.status(404).json({ message: 'Stock not found' });
        }
    
        await stock.remove();
        res.json({ message: 'Stock removed' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
})

module.exports=router
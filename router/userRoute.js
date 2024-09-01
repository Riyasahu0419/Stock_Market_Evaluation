const express=require("express")
const route=express.Router()
const userModel=require("../model/usermodel")



route.post("/register",async(req,res)=>{
    const {email,password} =req.body
    const data = await userModel.findOne({email})
    if(data){
        return res.json({msg:"user allready present"})
    }
    try {
        bcrypt.hash(password,5, async function(error,hash){
            if(error){
                return error
            }
            const user = new userModel({email, password:hash})
          await user.save()
          res.json({msg:"registration successfull",user})

        })
    } catch (error) {
        res.json({msg:`something wet wrong  ${error}`})
    }
})


route.post("/login",async(req,res)=>{
    const {email, password}= req.body
    const isPresent= await userModel.findOne({email})
    if(!isPresent){
        return res.json({msg:"user not found"})
    }

    try {
        bcrypt.compare(password,isPresent.password,function(err,result){
            if(err){
                return res.json("password encorrect , please try again")
            }
            const token=jwt.sign({id:isPresent.id},process.env.SCRETE_KEY,{expiresIn:"1m"})
            const refreshtoken=jwt.sign({id:isPresent.id},process.env.SCRETE_KEY,{expiresIn:"7d"})

            if(result){
                res.json({msg:"user login successfull",token,refreshtoken})
            }
        })   
    } catch (error) {
        res.json({msg:"user not found",error})
    }
})

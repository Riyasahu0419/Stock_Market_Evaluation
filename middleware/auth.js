const jwt= require("jsonwebtoken")
require("dotenv").config()

const AuthMiddle=async(req,res,next)=>{
    const token= req.headers.authorization.split(" ")[1]
    const refreshtoken=req.headers.authorization.split(" ")[1]
    
    if(!refreshtoken) return res.json({msg:"refreshToken not found"})


    console.log(token)
    if(!req.headers.authorization){
        return res.json({msg:"not authorized"})

    }
    if(!token){
        return res.json({msg:"token not found"})
        
    }
    try {
        jwt.verify(token,process.env.SCRETE_KEY,(err,decode)=>{
            if(err){
                return res.json({msg:"token not verified"})
            }

            if(decode){
                req.user={...decode,token,refreshtoken}
                console.log(decode)
                next()
            }
        })

    } catch (error) {
        res.json({msg:"auth middleware not found"})
    }
}

module.exports=AuthMiddle
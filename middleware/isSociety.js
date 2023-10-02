const jwt = require('jsonwebtoken')
const JWT_Token=process.env.JWT_TOKEN;
const isSociety=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(400).json("Please try to enter the correct token")
    }
    try {
        const data=jwt.verify(token,JWT_Token);
        req.society=data.society;
        console.log(data.society);
        console.log(req.society.id);
        next();
        
    } catch (error) {
        res.status(400).json("Please try to enter the correct token")

    }

}
module.exports=isSociety;
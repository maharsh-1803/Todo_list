const jwt = require('jsonwebtoken')

const authToken = async(req,res,next)=>{
    const token =  req.headers['authorization'];

    if(!token){
        return res.status(500).send({message:"Token not provided"});
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(500).json({message:"failed to verify token"})
        }
        req.user = decoded;
        next();
    })
}

module.exports = authToken
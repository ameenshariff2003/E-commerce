const jwt = require('jsonwebtoken');


const auth = (req,res,next)=>{
    try{
        const token = req.header("Authorization");
        if(!token){
            return res.this.status(400).json({msg:'Invalid Authentication'});
        }
        jwt.verify(token,process.env.SECRET_CODE,(err,user)=>{
            if(err){
                return res.status(400).json({msg:'invalid Authentication'})
            }
            req.user = user
            next();
        })

    }
    catch(err){
        return res.status(500).json({msg:err.message})

    }
}

module.exports=auth;
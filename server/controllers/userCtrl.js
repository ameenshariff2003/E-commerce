const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



const userCtrl = {
    register :async(req,res)=>{
        try{
            const {name,email,password} = req.body;

            const user = await Users.findOne({email})
            if(user){
                return res.status(400).json({msg:"email already registerd"})
            }
            
            if(password.length<6){
                return res.status(400).json({msg:"Password length should be minimum 6 "})
            }
            const hashPassword = await bcrypt.hash(password,10);


            const newUser = new Users({name,email,password:hashPassword})
            //saving in db

            await newUser.save()
            .then(()=>{console.log(`successfully Registered`)})
            .catch((err)=>{console.log(err)})

            //jwt to authentication

            const accessToken = createAccessToken({id:newUser._id});
            const refreshToken = createRefreshToken({id:newUser._id});


            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                path:'/users/refresh_token'
            })

            


            res.json({accessToken})



        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    },
    refreshtoken : async(req,res)=>{
        try{
            const rf_token = req.cookies.refreshToken;

            if(!rf_token)
                return res.status(400).json({msg:'pls login or register'})
            
    
            jwt.verify(rf_token,process.env.REFRESH_CODE,(err,user)=>{
                if(err) return res.status(400).json({msg:"please login or signup"})
                    
                
                const accessToken = createAccessToken({id:user.id})
                    res.json({user,accessToken})
            })
    

        }
        catch(err){
            return res.status(500).json({msg:err.message});

        }
       
    },
    login:async(req,res)=>{
        try{
            const {email,password} = req.body;
            const user = await Users.findOne({email})
            if(!user){
                return res.status(400).json({msg:'user not found'})
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({msg:"please check password and email and try again"})
            }
            const accessToken = createAccessToken({id:user._id})
            const refreshToken = createRefreshToken({id:user._id})

            res.cookie('refreshtoken',refreshToken,{
                httpOnly:true,
                path:'/users/refresh_token'
            })

            res.json({accessToken})

        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    },
    logout:async(req,res)=>{
        try{
            res.clearCookie('refreshToken',{path:'/users/refresh_token'})
            return res.json({msg:'logout'})

        }
        catch(err){
            return res.status(500).json(err.message)


        }

    },
    getUser:async(req,res)=>{
        try{
            const user = await Users.findById(req.user.id).select('-password')
            // select('-password') is used hear to show all the user data execpet password

            if(!user){
                return res.status(400).json({msg:'user not found'})
            }
            res.json(user)

        }
        catch(err){

        }
    }
}

const createAccessToken = (payload) =>{
    return jwt.sign(payload,process.env.SECRET_CODE,{expiresIn:'1d'})
}

const createRefreshToken = (payload) =>{
    return jwt.sign(payload,process.env.REFRESH_CODE,{expiresIn:'7d'})
}
module.exports = userCtrl;
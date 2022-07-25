const User = require('../model/user.model')
const jwt = require('jsonwebtoken')

exports.checkUserToken = async (req,res)=>{
    const token = req.body.token
    if(!token){
        return res.json({
            success:false,
            message:"Unauthorized User...!"
        })
    }
    let decodeToken
    try{
        decodeToken = jwt.verify(token,process.env.TOKEN_KEY)
    }catch(err){
        return res.json({
            success:false,
            message:"Unauthorized User...!"
        })
    }

    if(!decodeToken.id){
        return res.json({
            success:false,
            message:"Unauthorized User...!"
        })
    } 


    try {
        const user = await User.findById(decodeToken.id)
        if(!user){
            return res.json({
                success:false,
                message:"Unauthorized User...!"
            })
        }

        return res.json({
            success:true,
            message:"Authorized User...!"
        })

    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

}
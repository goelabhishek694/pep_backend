// let flag=false; // Userloggedin
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require('../secrets');
function protectRoute(req,res,next){
    try{
        if(req.cookies.login){
            console.log(req.cookies);
            let isVerified=jwt.verify(req.cookies.login,JWT_KEY);
            if(isVerified){
                next();
            }
            else{
                res.json({
                    message:"not authorized"
                });
            }
        }
        else{
            res.json({
                message:"operation not allowed"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports=protectRoute;
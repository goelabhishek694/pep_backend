const mongoose=require("mongoose");
const validator=require("validator");

mongoose.connect(`mongodb+srv://auth:auth123@cluster0.nbd5e.mongodb.net/auth?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connection.on('connected',()=>{
    console.log('mongoose is connected');
});
const userSchema=new mongoose.Schema({
    // name:{
    //    type:String,
    //    required:true 
    // },
    email:{
        type:String,
        required:true,
        validate:validator.isEmail
    }
    // ,
    // phoneno:{
    //     type:Number,
    //     required:true,
    //     minlength:10
    // },
    // carnumber:{
    //     type:String,
    //     required:true
    // }
});
const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema(
    {
        name:{
            require:true,
            max:6,
            type:String
        },
        email:
        {
            type:String,
            require:true,
            max:255,
            min:6
        },
        password:{
            type:String,
            max:1024,
            require:true,
            min:6
        },
        date:{
            type:Date,
            default:Date.now
        }
    });

    module.exports=mongoose.model('User',UserSchema);
const express=require('express');
const route=express.Router();
const User=require('../models/user');
const register_schema=require('../validation/register.validation');
const login_schema=require('../validation/login.validation');
const jwt=require("jsonwebtoken");
const bcrypt=require('../utils/bcrypt');


require("dotenv").config();

//validation using hapi/joi

route.post('/register', async (req,res)=>
{
    //validate user data before saving into mongo database
    const{error}=register_schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExist=await User.findOne({email:req.body.email});
    const encoded_password=await bcrypt.encode(req.body.password);
    if(emailExist) return res.status(400).send({message:"Email already exist!!!"});

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:encoded_password
    });
    try{
        const saveduser=user.save(user);
        res.status(200).json({message:"Reistration complete!!"});
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});


route.get('/users',(req,res)=>{
    try{
        User.find()
        .then(response=>{
                res.send(response); })
    }
    catch(err)
    {
        res.status(500).send( {message:err.message || "Error Occurred while retriving user information"})
    }
})

route.get('/login',async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json({message:"email not found or is incorrect"});

        if(!bcrypt.decode(user.password,req.body.password)) return res.status(400).json({message:"Password is incorrect."});

        //creatye and assign token
        const token=await jwt.sign({_id:user._id},'LKIUcgfgWEQQY')
        res.header('auth-token',token).json({message:token})
    }
    catch(err){
        res.status(400).json({message: ""+err})
    }
})

module.exports=route;
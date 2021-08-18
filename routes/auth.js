const express=require('express');
const route=express.Router();
const User=require('../models/user');
const register_schema=require('../validation/register.validation');
const login_schema=require('../validation/login.validation');
const bcrypt=require('../utils/bcrypt');

//validation using hapi/joi

	

route.post('/register', async (req,res)=>
{
    //validate user data before saving into mongo database
    const{error}=register_schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send({message:"Email already exist!!!"});

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.encode(req.body.password)
    });
    try{
        const saveduser=user.save(user);
        res.send(saveduser);
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

        res.json({message:"Logged in !!!"});
    }
    catch(err){
        res.status(400).json({message:"occured while trying to log in the user"+req.body.email})
    }
})

module.exports=route;
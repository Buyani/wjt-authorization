const express=require("express");
const dbconnect=require('./database/connection');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');

dotenv.config();

const app=express();
dbconnect();

//middleware
app.use(express.json())

//routes middle wares
app.use('/api/user',authRoute);

app.listen(4000,()=>{
    console.log("Server started at port 4000!!!.");
})
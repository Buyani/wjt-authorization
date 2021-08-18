const mongoose=require("mongoose");

const connectDB=()=>
{
    try{
        const connect=mongoose.connect("mongodb://localhost:27017/authdataapp",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`MongoDB connected !!!..`);
    }
    catch(err)
    {
        console.log("error "+err+" encounted while connecting to database!!!");
        process.exit(1);
    }
}

module.exports=connectDB;
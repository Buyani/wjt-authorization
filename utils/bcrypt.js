const bcrypt=require("bcrypt");

const encode=async (plainpassword)=>{

    const encryptedpass =await bcrypt.genSalt().then(salt=>{
       await  bcrypt.hash(plainpassword,salt);
    });
    return encryptedpass;
}

const decode=async(hashedpass,plainpassword)=>{
    return await bcrypt.compare(plainpassword,hashedpass);
}

module.exports={encode,decode};
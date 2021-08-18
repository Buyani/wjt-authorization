const bcrypt=require("bcrypt");

const encode=async (plainpassword)=>{
    const salt=await bcrypt.genSalt();
    const encryptedpass =await bcrypt.hash(plainpassword,salt);
    return encryptedpass;
}

const decode=async(hashedpass,plainpassword)=>{
    const results=await bcrypt.compare(plainpassword,hashedpass);
    return results;
}

module.exports={encode,decode};
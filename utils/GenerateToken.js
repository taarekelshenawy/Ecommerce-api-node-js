
const jwt=require('jsonwebtoken');

    const GenerateToken =(payload)=>{
           const token =jwt.sign({ userId:payload},process.env.JWT_SECRET_KEY,{expiresIn:'90d'});
           return token;
    }

module.exports=GenerateToken;
 


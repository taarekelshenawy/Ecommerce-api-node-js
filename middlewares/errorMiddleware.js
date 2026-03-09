const ApiError = require('../utils/appError');
const sendErrorforDev=(err,res)=>{
    return   res.status(404).json({success:"success",err:{
        message:err.message,
        statusCode:err.statusCode,
        statusText:err.statusText,
        stack:err.stack

    }})
}
const sendErrorforProd=(err,res)=>{
    return   res.status(404).json({success:"success",err:{
        message:err.message,
        statusText:err.statusText,
        

    }})
}


const handleJwtInvalidSignature = () =>
  new ApiError('Invalid token, please login again..', 401);

const handleJwtExpired = () =>
  new ApiError('Expired token, please login again..', 401);



const globalError =(err,req,res,next)=>{

    if(process.env.NODE_ENV === 'development'){
        sendErrorforDev(err,res)
    }else{
    if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
    if (err.name === 'TokenExpiredError') err = handleJwtExpired()
        sendErrorforProd(err,res)
    }
}

module.exports=globalError;
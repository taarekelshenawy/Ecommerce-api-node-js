const globalError =(err,req,res,next)=>{

    if(process.env.NODE_ENV === 'development'){
        sendErrorforDev(err,res)
    }else{
        sendErrorforProd(err,res)
    }
}

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

module.exports=globalError;
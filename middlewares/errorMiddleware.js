const globalError =(err,req,res,next)=>{
    res.status(404).json({success:"success",err:{
        message:err.message,
        statusCode:err.statusCode,
        statusText:err.statusText,
        stack:err.stack

    }})
}

module.exports=globalError;
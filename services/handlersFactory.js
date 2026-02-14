const asyncHandler = require('express-async-handler');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');

exports.deleteOne=(Model)=>
 asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        console.log(id)
        const document=await Model.findByIdAndDelete(id);

        if(!document){
        const error =new appError("No documnet for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:"documnet deleted"})


    }
)

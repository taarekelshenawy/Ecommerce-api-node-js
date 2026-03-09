const asyncHandler = require('express-async-handler');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const apiFeatures = require('../utils/apiFeatures');

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
exports.updateOne=(Model)=>asyncHandler(
    async(req,res,next)=>{
        const document=await Model.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(! document){
        const error =new appError("No document for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:document})

    }

)

exports.createOne =(Model)=>asyncHandler(async(req,res)=>{
       const document= await Model.create(req.body)
       return res.status(201).json({status:'success',data:document})
})

exports.getOne=(Model)=>asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const document=await Model.findById(id);
        if(!document){
        const error =new appError("No document for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:document})
    }

)

exports.getAll=(Model)=>asyncHandler(
      async(req,res,next)=>{
       const countDocuments= await Model.countDocuments();
       let filter = {};
        if (req.filterObj) {
        filter = req.filterObj;
        }
          
        const apifeatures = new apiFeatures(Model.find(filter),req.query)
        .filter()
        .sort()
        .fieldLimit()
        .paginate(countDocuments);
        const {mongooseQuery,paginationResult}=apifeatures;
               
        const document= await mongooseQuery;
       return res.status(201).json({status:'success',paginationResult,results:document.length,data:document})
    }

)
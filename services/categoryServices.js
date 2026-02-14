const CategoryModel = require("../models/CategoryModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const { validationResult } = require('express-validator');
const apiFeatures = require('../utils/apiFeatures');
const factory =require("./handlersFactory")


const getCategory =asyncHandler(
      async(req,res,next)=>{
   
       const countDocuments= await CategoryModel.countDocuments();
                 
               const apifeatures = new apiFeatures(CategoryModel.find(),req.query)
               .filter()
               .sort()
               .fieldLimit()
               .paginate(countDocuments);
               //  .populate({ path: "category", select: "name -_id" })
               const {mongooseQuery,paginationResult}=apifeatures;
                      
               const Categories= await mongooseQuery;
       return res.status(201).json({status:'success',paginationResult,results:Categories.length,data:Categories})
    }

)

const getSpecificCategory =asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const specficCategory =await CategoryModel.findById(id);
        if(!specficCategory){
        const error =new appError("No Category for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:specficCategory})
    }

)

const updateSpecificCategory=asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const name = req.body.name;
        const UpdatespecficCategory =await CategoryModel.findByIdAndUpdate(id,{ $set: { name: name,slug:slugify(name) }},{new:true});
        if(!UpdatespecficCategory){
        const error =new appError("No Category for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data: UpdatespecficCategory})

    }

)
const postCategory=asyncHandler(async(req,res)=>{
       const name =req.body.name;
       const newCategory = await CategoryModel.create({name,slug:slugify(name)})
       return res.status(201).json({status:'success',data:newCategory})
})



const deleteCategory =factory.deleteOne(CategoryModel);

module.exports={
    postCategory,
    getCategory,
    getSpecificCategory,
    updateSpecificCategory,
    deleteCategory
}
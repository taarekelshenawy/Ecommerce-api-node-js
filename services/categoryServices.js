const CategoryModel = require("../models/CategoryModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const { validationResult } = require('express-validator');


const getCategory =asyncHandler(
      async(req,res,next)=>{
     const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip =(page-1) * limit;
        
       const Categories = await CategoryModel.find({},{"__v":false}).limit(limit).skip(skip);
       return res.status(201).json({status:'success',page,results:Categories.length,data:Categories})
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

const deleteCategory = asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const category =await CategoryModel.findByIdAndDelete(id);

        if(!category){
        const error =new appError("No Category for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:"category deleted"})


    }
)

module.exports={
    postCategory,
    getCategory,
    getSpecificCategory,
    updateSpecificCategory,
    deleteCategory
}
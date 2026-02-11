const subCategoryModel = require("../models/subcategoryModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const { validationResult } = require('express-validator');


const setCategoryIdtoBody=(req,res,next)=>{
     if(!req.body.category)
         req.body.category=req.params.categoryId;
    
     next();

}

const getsubCategory =asyncHandler(
      async(req,res,next)=>{
     const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip =(page-1) * limit;

          const filter = {};
            if (req.params.categoryId) {
                console.log(req.params.categoryId)
                filter.category = req.params.categoryId;
            }
        
       const subCategories = await subCategoryModel.find(filter,{"__v":false}).limit(limit).skip(skip).populate({path:'category',select:"name -_id"});
       return res.status(201).json({status:'success',page,results:subCategories.length,data:subCategories})
    }

)

const getSpecificsubCategory =asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const specficCategory =await subCategoryModel.findById(id);
        if(!specficCategory){
        const error =new appError("No subCategory for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:specficCategory})
    }

)

const updateSpecificsubCategory=asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const {name,category}= req.body;
        const UpdatespecficsubCategory =await subCategoryModel.findByIdAndUpdate(id,{ $set: { name: name,slug:slugify(name),category:category }},{new:true});
        if(!UpdatespecficsubCategory){
        const error =new appError("No Category for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data: UpdatespecficsubCategory})

    }

)
const postsubCategory=asyncHandler(async(req,res)=>{
   
       const {name,category} =req.body;
       const newsubCategory = await subCategoryModel.create({name,slug:slugify(name),category})
       return res.status(201).json({status:'success',data:newsubCategory})
})

const deletesubCategory = asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const subcategory =await subCategoryModel.findByIdAndDelete(id);

        if(!subcategory){
        const error =new appError("No Category for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:"subcategory deleted"})


    }
)

module.exports={
    postsubCategory,
    getsubCategory,
    getSpecificsubCategory,
    updateSpecificsubCategory,
    deletesubCategory,
    setCategoryIdtoBody
}
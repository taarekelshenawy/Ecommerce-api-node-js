const BrandModel = require("../models/BrandModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const { validationResult } = require('express-validator');
const apiFeatures = require('../utils/apiFeatures');
const factory =require("./handlersFactory");


const getBrands =asyncHandler(
      async(req,res,next)=>{

       const countDocuments= await BrandModel.countDocuments();
          
        const apifeatures = new apiFeatures(BrandModel.find(),req.query)
        .filter()
        .sort()
        .fieldLimit()
        .paginate(countDocuments);
        //  .populate({ path: "category", select: "name -_id" })
        const {mongooseQuery,paginationResult}=apifeatures;
               
        const Brands= await mongooseQuery;
       return res.status(201).json({status:'success',paginationResult,results:Brands.length,data:Brands})
    }

)

const getSpecificBrand =asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const specficBrand =await BrandModel.findById(id);
        if(!specficBrand){
        const error =new appError("No Brand for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:specficBrand})
    }

)

const updateSpecificBrand=asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const name = req.body.name;
        const UpdatespecficBrand =await BrandModel.findByIdAndUpdate(id,{ $set: { name: name,slug:slugify(name) }},{new:true});
        if(! UpdatespecficBrand ){
        const error =new appError("No Brand for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:UpdatespecficBrand})

    }

)
const postBrand=asyncHandler(async(req,res)=>{
       const name =req.body.name;
       const newBrand = await BrandModel.create({name,slug:slugify(name)})
       return res.status(201).json({status:'success',data:newBrand})
})


const deleteBrand =factory.deleteOne(BrandModel);
module.exports={
    postBrand,
    getBrands,
    getSpecificBrand,
    updateSpecificBrand,
    deleteBrand
}
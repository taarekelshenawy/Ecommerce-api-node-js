const BrandModel = require("../models/BrandModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const { validationResult } = require('express-validator');


const getBrands =asyncHandler(
      async(req,res,next)=>{
     const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip =(page-1) * limit;
        
       const Brands = await BrandModel.find({},{"__v":false}).limit(limit).skip(skip);
       return res.status(201).json({status:'success',page,results:Brands.length,data:Brands})
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

const deleteBrand = asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const Brand =await BrandModel.findByIdAndDelete(id);

        if(!Brand){
        const error =new appError("No Brand for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:"Brand deleted"})


    }
)

module.exports={
    postBrand,
    getBrands,
    getSpecificBrand,
    updateSpecificBrand,
    deleteBrand
}
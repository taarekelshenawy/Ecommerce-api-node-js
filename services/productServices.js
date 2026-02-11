const Product = require("../models/ProductModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const { validationResult } = require('express-validator');


const getProducts =asyncHandler(
      async(req,res,next)=>{
     const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip =(page-1) * limit;
        
       const products= await Product.find({},{"__v":false}).limit(limit).skip(skip)
               .populate({ path: "category", select: "name -_id" });;
       return res.status(201).json({status:'success',page,results:products.length,data:products})
    }

)

const getSpecificProduct =asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        const specficProduct =await Product.findById(id)
        .populate({ path: "category", select: "name" });
        if(!specficProduct){
        const error =new appError("No Product for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:specficProduct})
    }

)

const updateSpecificProduct=asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        if(req.body.title){
            req.body.slug=slugify(req.body.title)
        }
        const UpdatespecficProduct =await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!UpdatespecficProduct){
        const error =new appError("No Product for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data: UpdatespecficProduct})

    }

)
const postProduct=asyncHandler(async(req,res)=>{
     req.body.slug=slugify(req.body.title)
       const newProduct = await Product.create(req.body)
       return res.status(201).json({status:'success',data:newProduct})
})

const deleteProduct = asyncHandler(
    async(req,res,next)=>{
        const id = req.params.id;
        console.log(id)
        const product=await Product.findByIdAndDelete(id);

        if(!product){
        const error =new appError("No Product for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:"Product deleted"})


    }
)

module.exports={
    postProduct,
    getProducts,
    getSpecificProduct,
    updateSpecificProduct,
    deleteProduct,
}
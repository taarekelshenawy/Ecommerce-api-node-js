const Product = require("../models/ProductModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const appError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const { validationResult } = require('express-validator');

const apiFeatures = require('../utils/apiFeatures')


const getProducts =asyncHandler(async(req,res,next)=>{
   
        const apifeatures = new apiFeatures(Product.find(),req.query)
          .filter()
        .sort()
        .fieldLimit()
        .paginate();
        //  .populate({ path: "category", select: "name -_id" })
        
       const products= await apifeatures.mongooseQuery;
       return res.status(201).json({status:'success',results:products.length,data:products})
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
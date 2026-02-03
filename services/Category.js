const CategoryModel = require("../models/Categroy.models");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')


const getCategory =asyncHandler(
      async(req,res)=>{
     const query = req.query;
   const limit = query.limit || 10;
   const page = query.page || 1;
   const skip =(page-1) * limit;
        
       const Categories = await CategoryModel.find({},{"__v":false}).limit(limit).skip(skip)
       return res.status(201).json({status:'success',page,results:Categories.length,data:Categories})
    }

)

const getSpecificCategory =asyncHandler(
    async(req,res)=>{
        const id = req.params.id;
        const specficCategory =await CategoryModel.findById(id);
        return res.status(201).json({status:'success',data:specficCategory})
    }

)
const postCategory=asyncHandler(async(req,res)=>{
       const name =req.body.name;
       const newCategory = await CategoryModel.create({name,slug:slugify(name)})
       return res.status(201).json({status:'success',data:newCategory})
})

module.exports={
    postCategory,
    getCategory,
    getSpecificCategory,
}
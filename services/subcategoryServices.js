
const subcategoryModel = require("../models/subcategoryModel");
const factory =require("./handlersFactory")


const setCategoryIdtoBody=(req,res,next)=>{
     if(!req.body.category)
         req.body.category=req.params.categoryId;
    
     next();

}

const createFileobj=(req,res,next)=>{
    let filterObj={}
    if(req.params.categoryId) filterObj={category:req.params.categoryId}
    req.filterObj= filterObj;
    next()
}


const getsubCategory=factory.getAll(subcategoryModel)

const getSpecificsubCategory =factory.getOne(subcategoryModel)

const updateSpecificsubCategory=factory.updateOne(subcategoryModel)
const postsubCategory=factory.createOne(subcategoryModel)

const  deletesubCategory=factory.deleteOne(subcategoryModel)

module.exports={
    postsubCategory,
    getsubCategory,
    getSpecificsubCategory,
    updateSpecificsubCategory,
    deletesubCategory,
    setCategoryIdtoBody,
    createFileobj,
}
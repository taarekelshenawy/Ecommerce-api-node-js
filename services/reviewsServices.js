const Review = require("../models/reviewModal");
const factory =require("./handlersFactory");






const setProductIdtoBody=(req,res,next)=>{
     if(!req.body.product){
        req.body.product=req.params.productId;
     }
        if(!req.body.user){
            req.body.user = req.user._id;
        }
    
     next();

}


const createFileobj=(req,res,next)=>{
    let filterObj={}
    if(req.params.productId) filterObj={product:req.params.productId}
    req.filterObj= filterObj;
    next()
}






const getReviews=factory.getAll(Review)

const getSpecificReview=factory.getOne(Review)

const updateSpecificReview=factory.updateOne(Review)
const postReview=factory.createOne(Review)


const deleteReview =factory.deleteOne(Review);
module.exports={
    postReview,
    getReviews,
    getSpecificReview,
    updateSpecificReview,
   deleteReview,
   setProductIdtoBody,
   createFileobj,
}
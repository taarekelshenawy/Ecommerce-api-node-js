const Review = require("../models/reviewModal");
const factory =require("./handlersFactory");











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
}
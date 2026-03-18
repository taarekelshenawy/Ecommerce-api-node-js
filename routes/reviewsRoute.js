const express = require("express");
const router = express.Router({ mergeParams: true });
const {protect,allowedTo}=require("../services/authServices");
const {createReviewsValidator,updateReviewsValidator,deleteReviewsValidator}=require("../utils/reviewsValidator")
const {setProductIdtoBody,createFileobj,getReviews,postReview,updateSpecificReview,deleteReview,getSpecificReview}= require("../services/reviewsServices");


router.route("/")
.get(createFileobj,getReviews)
.post(protect,allowedTo("user"),setProductIdtoBody,createReviewsValidator,postReview)


router.route("/:id")
.get(getSpecificReview)
.patch(protect,allowedTo("user"),updateReviewsValidator,updateSpecificReview)
.delete(protect,allowedTo("user","admin","manager"),deleteReviewsValidator,deleteReview)

module.exports= router;
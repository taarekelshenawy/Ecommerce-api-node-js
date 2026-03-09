const express = require("express");
const router = express.Router();
const {protect,allowedTo}=require("../services/authServices")
const {getReviews,postReview,updateSpecificReview,deleteReview,getSpecificReview}= require("../services/reviewsServices");


router.route("/")
.get(getReviews)
.post(protect,allowedTo("user"),postReview)


router.route("/:id")
.get(getSpecificReview)
.patch(protect,allowedTo("user"),updateSpecificReview)
.delete(protect,allowedTo("user","admin","manager"),deleteReview)

module.exports= router;
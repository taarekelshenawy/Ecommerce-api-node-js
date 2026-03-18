const express = require("express");
const router = express.Router();
const {protect,allowedTo}=require('../services/authServices')
const {getCoupons,updateSpecificCoupon,getSpecificCoupon,deleteCoupon,createCoupon}= require("../services/couponServices");

router.use(protect)

router.route("/")
.get(getCoupons)
.post(createCoupon)




router.route("/:id")
.get(getSpecificCoupon)
.patch(updateSpecificCoupon)
.delete(deleteCoupon)

module.exports= router;
const express = require("express");
const router = express.Router();
const {protect}=require("../services/authServices")
const {addProductToCart,getLoggedUserCart,
    removeSpecificCartItem,removeCart,updateSpecificCartItem,applyCoupon}= require("../services/cartServices");

router.route("/")
.get(protect,getLoggedUserCart)
.post(protect,addProductToCart)
.delete(protect,removeCart)

router.route("/applyCoupon")
.put(protect,applyCoupon)

router.route("/:itemId")
.delete(protect,removeSpecificCartItem)
.patch(protect,updateSpecificCartItem)

module.exports= router;
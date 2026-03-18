const express = require("express");
const router = express.Router();
const {protect,allowedTo}=require('../services/authServices')
const {addProductToWishlist,removeProductToWishlist,getLoggedUserWishlist}= require("../services/wishlistServices");


router.route("/")
.get(protect,allowedTo("user"),getLoggedUserWishlist)
.post(protect,allowedTo("user"),addProductToWishlist)

router.delete("/:productId",protect,allowedTo("user"),removeProductToWishlist)




module.exports= router;
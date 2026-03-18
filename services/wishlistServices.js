const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const addProductToWishlist = asyncHandler(async (req,res,next)=>{

    if(!req.body.productId){
        return next(new AppError("ProductId required",400))
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet:{ wishlist:req.body.productId }
        },
        { new:true }
    )

    if(!user){
        return next(new AppError("User not found",404))
    }

    res.status(200).json({
        status:"success",
        data:user.wishlist
    })

})


const removeProductToWishlist = asyncHandler(async (req,res,next)=>{

    if(!req.params.productId){
        return next(new AppError("ProductId required",400))
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull:{ wishlist:req.params.productId}
        },
        { new:true }
    )

    if(!user){
        return next(new AppError("User not found",404))
    }

    res.status(200).json({
        status:"success",
        data:user.wishlist
    })

})

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Protected/User
const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('wishlist');

  res.status(200).json({
    status: 'success',
    results: user.wishlist.length,
    data: user.wishlist,
  });
});

module.exports = { addProductToWishlist,removeProductToWishlist,getLoggedUserWishlist }
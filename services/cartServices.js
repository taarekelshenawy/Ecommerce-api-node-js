const asyncHandler = require('express-async-handler');
const appError = require('../utils/appError');
const Product = require("../models/ProductModel");
const Cart = require('../models/cartModel')
const Coupon = require('../models/CouponModel');


const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};

exports.addProductToCart=asyncHandler(async(req,res,next)=>{
    const {productId,color}=req.body;
    const product =await Product.findById(productId)

    // get cart logged user
    const cart =await Cart.findOne({user:req.user._id});
    if(!cart){
        // create cart for logged user with product
        await Cart.create({
            user:req.user._id,
            cartItems:[{product:product._id,color,price:product.price}]
        })
    }else{
       const productIndex = cart.cartItems.findIndex(item=>
       item.product.toString() === productId &&
        item.color === color
       )
       if(productIndex > -1){
        const item = cart.cartItems[productIndex];
        item.quantity+=1
        cart.cartItems[productIndex]=item;
       }else{
        cart.cartItems.push({product:product._id,color,price:product.price})
       }

    }
// get cart total price
     calcTotalCartPrice(cart);
     
  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
    await cart.save()

})

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/User
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new appError(`There is no cart for this user id : ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});


// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/User
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});


exports.removeCart =asyncHandler(async(req,res,next)=>{
     await Cart.findOneAndDelete({ user: req.user._id });
     res.status(204).send();
    

})


exports.updateSpecificCartItem=asyncHandler(async(req,res,next)=>{
   const cart = await Cart.findOneAndUpdate(
        { user: req.user._id, "cartItems._id": req.params.itemId },
        { 
            $set: { 
           "cartItems.$.quantity": req.body.quantity, 
            } 
        },
        { new: true }
        ); 
  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: 'success',
    
    data: cart,
  });
    

})



// apply copoun on Cart

exports.applyCoupon=asyncHandler(async(req,res,next)=>{
  // get coupon logged user
  const coupon = await Coupon.findOne({name:req.body.coupon,expire:{$gt:Date.now()}});
  if(!coupon){
    return next(new appError("Coupon is invalid or expired"))
  }

  // get cart
  const cart = await Cart.findOne({user:req.user._id});
  const totalPrice =cart.totalCartPrice;

  const PriceAfterDiscount =(totalPrice - (coupon.discount * totalPrice) /100).toFixed(2);

  cart.totalPriceAfterDiscount=PriceAfterDiscount;
  await cart.save()
 res.status(200).json({
    status: 'success',
     numOfCartItems: cart.cartItems.length,
    data: cart,
  });




})
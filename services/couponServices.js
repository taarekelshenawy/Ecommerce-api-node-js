const Coupon= require("../models/CouponModel");
const factory =require("./handlersFactory");










const getCoupons=factory.getAll(Coupon)

const getSpecificCoupon =factory.getOne(Coupon)

const updateSpecificCoupon=factory.updateOne(Coupon)
const createCoupon=factory.createOne(Coupon)


const deleteCoupon=factory.deleteOne(Coupon);
module.exports={
    createCoupon,
    getCoupons,
    getSpecificCoupon,
    updateSpecificCoupon,
    deleteCoupon,

}
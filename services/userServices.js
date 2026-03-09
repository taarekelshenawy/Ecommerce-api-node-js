const User = require("../models/userModel");
const factory =require("./handlersFactory");
const sharp = require('sharp');
const { uploadSingleImage} = require('../middlewares/uploadimageMiddleware')
const asyncHandler = require('express-async-handler');
const bycript=require('bcryptjs');
const createToken = require("../utils/GenerateToken")



const uploadUserImage=uploadSingleImage('image')

// upload image with proccessing

const resizeImage =async(req,res,next)=>{
    const randomNum = Math.floor(Math.random() * 1_000_000);
    const fileName = `user-${Date.now()}-${randomNum}.jpeg`;
     if (!req.file) return next(); 
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/users/${fileName}`)
        req.body.image=fileName;
        next()

}





const getUsers=factory.getAll(User)

const getSingleUser =factory.getOne(User)

const updateUser=asyncHandler(
    async(req,res,next)=>{
        const document=await User.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            image:req.body.image,
            slug:req.body.slug,
            role:req.body.role,

        },{new:true});
        if(! document){
        const error =new appError("No document for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:document})

    }

)

const ChangePassowrd=asyncHandler(
    async(req,res,next)=>{
        const document=await User.findByIdAndUpdate(req.params.id,{
           password:await bycript.hash(req.body.password,12),
           passwordChangedAt:Date.now()
     

        },{new:true});
        if(! document){
        const error =new appError("No document for thid Id",404,FAIL);
        return next(error)
       }
        return res.status(201).json({status:'success',data:document})

    }

)
const addUser=factory.createOne(User)


const deleteUser =factory.deleteOne(User);



// get date of me as user

const getLoggedUser= asyncHandler(async(req,res,next)=>{
    req.params.id=req.user._id;
    next();

})

const updateLoggedUserPassword=asyncHandler(async(req,res,next)=>{
     const user=await User.findByIdAndUpdate(req.user._id,{
           password:await bycript.hash(req.body.password,12),
           passwordChangedAt:Date.now()
     

        },{new:true});
        if(!user){
        const error =new appError("No user for thid Id",404,FAIL);
        return next(error)
       }
         const token = createToken(user._id)
        return res.status(201).json({status:'success',user,token})

    

})


const updateLoggedUserData=asyncHandler(async(req,res,next)=>{
    const user =await User.findByIdAndUpdate(req.user._id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone

    },{new:true})

    res.status(200).json({status:"success",user:user})
})

const DeactiveLoggedUserData =asyncHandler(async(req,res,next)=>{
    const user =await User.findByIdAndUpdate(req.user._id,{active:false})
    res.status(204).json({status:"success"})
})


module.exports={
   getUsers,
   getSingleUser,
   updateUser,
   addUser,
   deleteUser,
    uploadUserImage,
    resizeImage,
    ChangePassowrd,
    getLoggedUser,
    updateLoggedUserPassword,
    updateLoggedUserData,
    DeactiveLoggedUserData,
}
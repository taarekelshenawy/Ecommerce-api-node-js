const BrandModel = require("../models/BrandModel");
const factory =require("./handlersFactory");
const sharp = require('sharp');
const { uploadSingleImage} = require('../middlewares/uploadimageMiddleware')





const uploadBrandImage=uploadSingleImage('image')

// upload image with proccessing

const resizeImage =async(req,res,next)=>{
    const randomNum = Math.floor(Math.random() * 1_000_000);
    const fileName = `Brand-${Date.now()}-${randomNum}.jpeg`;
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/brands/${fileName}`)
        req.body.image=fileName;
        next()

}





const getBrands=factory.getAll(BrandModel)

const getSpecificBrand =factory.getOne(BrandModel)

const updateSpecificBrand=factory.updateOne(BrandModel)
const postBrand=factory.createOne(BrandModel)


const deleteBrand =factory.deleteOne(BrandModel);
module.exports={
    postBrand,
    getBrands,
    getSpecificBrand,
    updateSpecificBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage,
}
const Product = require("../models/ProductModel");

const factory =require("./handlersFactory");
const multer  = require('multer');
const apiError = require('../utils/appError')
const {FAIL}=require('../utils/httpStatusText');

const asyncHandler = require('express-async-handler');
const sharp = require('sharp');

const  {uploadMixOfImages,uploadSingleImage}=require('../middlewares/uploadimageMiddleware')



// upload mix of products
const uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

const resizeProductImages = asyncHandler(async (req, res, next) => {
  //1- Image processing for imageCover
    if (req.files.imageCover) {
      const randomNum = Math.floor(Math.random() * 1_000_000);
        const imageCoverFileName= `product-${Date.now()}-${randomNum}-cover.jpeg`;
      await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${imageCoverFileName}`);
  
      // Save image into our db
      req.body.imageCover = imageCoverFileName;
    }
    //2- Image processing for images
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (img, index) => {
        const randomNum = Math.floor(Math.random() * 1_000_000);
        const imageName= `product-${Date.now()}-${randomNum}-cover.jpeg`;
  
          await sharp(img.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageName}`);
  
          // Save image into our db
          req.body.images.push(imageName);
        })
      );
  
      next();
    }
});


const getProducts = factory.getAll(Product)


const getSpecificProduct =factory.getOne(Product)

const updateSpecificProduct=factory.updateOne(Product)
const postProduct=factory.createOne(Product)


const deleteProduct =factory.deleteOne(Product);
module.exports={
    postProduct,
    getProducts,
    getSpecificProduct,
    updateSpecificProduct,
    deleteProduct,
    // uploadProductImage,
    uploadProductImages,
    resizeProductImages,
   
    
}
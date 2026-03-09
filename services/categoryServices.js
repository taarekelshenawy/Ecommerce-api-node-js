const CategoryModel = require("../models/CategoryModel");
const factory =require("./handlersFactory");
const sharp = require('sharp');
const { uploadSingleImage} = require('../middlewares/uploadimageMiddleware')







const uploadCategoyImage=uploadSingleImage('image')

// upload image with proccessing

const resizeImage =async(req,res,next)=>{
    const randomNum = Math.floor(Math.random() * 1_000_000);
    const fileName = `category-${Date.now()}-${randomNum}.jpeg`;
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/categories/${fileName}`)
        req.body.image=fileName;
        next()

}



const getCategory=factory.getAll(CategoryModel)




const getSpecificCategory =factory.getOne(CategoryModel)

const updateSpecificCategory=factory.updateOne(CategoryModel)
const postCategory=factory.createOne(CategoryModel)


const deleteCategory =factory.deleteOne(CategoryModel);

module.exports={
    postCategory,
    getCategory,
    getSpecificCategory,
    updateSpecificCategory,
    deleteCategory,
    uploadCategoyImage,
    resizeImage,
}
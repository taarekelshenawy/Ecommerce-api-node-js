const CategoryModel = require("../models/CategoryModel");
const factory =require("./handlersFactory")

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
    deleteCategory
}
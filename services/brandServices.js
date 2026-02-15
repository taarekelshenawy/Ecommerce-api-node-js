const BrandModel = require("../models/BrandModel");
const factory =require("./handlersFactory");

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
    deleteBrand
}
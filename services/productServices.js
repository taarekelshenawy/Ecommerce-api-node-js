const Product = require("../models/ProductModel");

const factory =require("./handlersFactory")


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
}
const express = require("express");
const router = express.Router();
const ProductServices = require("../services/Product");
const {createProductValidator,getProductValidator,updateProductValidator,deleteProductValidator} = require('../utils/productValidator')

router.route("/")
.get(ProductServices.getProducts)
.post(createProductValidator,ProductServices.postProduct)



router.route("/:id")
.get(getProductValidator,ProductServices.getSpecificProduct)
.patch(updateProductValidator,ProductServices.updateSpecificProduct)
.delete(deleteProductValidator,ProductServices.deleteProduct)

module.exports= router;
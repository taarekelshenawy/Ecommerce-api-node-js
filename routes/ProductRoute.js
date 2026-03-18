const express = require("express");
const router = express.Router();
const ProductServices = require("../services/productServices");
const {createProductValidator,getProductValidator,updateProductValidator,deleteProductValidator} = require('../utils/productValidator')
const reviewRoute = require('./reviewsRoute');

router.route("/")
.get(ProductServices.getProducts)
.post(ProductServices.uploadProductImages,ProductServices.resizeProductImages,createProductValidator,ProductServices.postProduct)



// Nested Route
router.use('/:productId/reviews',reviewRoute);

router.route("/:id")
.get(getProductValidator,ProductServices.getSpecificProduct)
.patch(updateProductValidator,ProductServices.updateSpecificProduct)
.delete(deleteProductValidator,ProductServices.deleteProduct)

module.exports= router;
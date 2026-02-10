const express = require("express");
const router = express.Router();
const BrandServices = require("../services/Brand");
const {getBrandValidator,createBrandValidator,
    updateBrandValidator,deleteBrandValidator} = require('../utils/Brand/BrandValidator')

router.route("/")
.get(BrandServices.getBrands)
.post(createBrandValidator,BrandServices.postBrand)

const subCategoryRoute = require('./subCategoryRoute');

// Nested Route
router.use('/:categoryId/subcategories', subCategoryRoute);

router.route("/:id")
.get(getBrandValidator,BrandServices.getSpecificBrand)
.patch(updateBrandValidator,BrandServices.updateSpecificBrand)
.delete(deleteBrandValidator,BrandServices.deleteBrand)

module.exports= router;
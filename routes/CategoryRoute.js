const express = require("express");
const router = express.Router();
const CategoryServices = require("../services/categoryServices");
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require('../utils/categoryValidator')
const {protect,allowedTo}=require('../services/authServices')

router.route("/")
.get(CategoryServices.getCategory)
.post(
 protect,
 allowedTo('admin','manager'),
 CategoryServices.uploadCategoyImage,
 CategoryServices.resizeImage,
  createCategoryValidator,
  CategoryServices.postCategory
)


const subCategoryRoute = require('./subCategoryRoute');

// Nested Route
router.use('/:categoryId/subcategories', subCategoryRoute);

router.route("/:id")
.get(getCategoryValidator,CategoryServices.getSpecificCategory)

.patch(protect,
 allowedTo('admin','manager'),CategoryServices.uploadCategoyImage,
 CategoryServices.resizeImage,updateCategoryValidator,CategoryServices.updateSpecificCategory)

.delete(protect,
 allowedTo('admin','manager'),deleteCategoryValidator,CategoryServices.deleteCategory)

module.exports= router;
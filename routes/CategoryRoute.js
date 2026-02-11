const express = require("express");
const router = express.Router();
const CategoryServices = require("../services/categoryServices");
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require('../utils/Category/categoryValidator')

router.route("/")
.get(CategoryServices.getCategory)
.post(createCategoryValidator,CategoryServices.postCategory)

const subCategoryRoute = require('./subCategoryRoute');

// Nested Route
router.use('/:categoryId/subcategories', subCategoryRoute);

router.route("/:id")
.get(getCategoryValidator,CategoryServices.getSpecificCategory)
.patch(updateCategoryValidator,CategoryServices.updateSpecificCategory)
.delete(deleteCategoryValidator,CategoryServices.deleteCategory)

module.exports= router;
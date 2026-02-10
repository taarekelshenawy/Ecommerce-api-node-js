const express = require("express");
const router = express.Router({ mergeParams: true });
const subCategoryServices = require("../services/subCategory");
const {createsubCategoryValidator,getsubCategoryValidator,updatesubCategoryValidator,deletesubCategoryValidator} = require('../utils/Category/subcategoryValidator')

router.route("/")
.get(subCategoryServices.getsubCategory)
.post(subCategoryServices.setCategoryIdtoBody,createsubCategoryValidator,subCategoryServices.postsubCategory)


router.route("/:id")
.get(getsubCategoryValidator,subCategoryServices.getSpecificsubCategory)
.patch(updatesubCategoryValidator,subCategoryServices.updateSpecificsubCategory)
.delete(deletesubCategoryValidator,subCategoryServices.deletesubCategory)

module.exports= router;
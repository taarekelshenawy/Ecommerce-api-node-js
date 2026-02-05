const express = require("express");
const router = express.Router();
const CategoryServices = require("../services/Category")

router.route("/")
.get(CategoryServices.getCategory)
.post(CategoryServices.postCategory)


router.route("/:id")
.get(CategoryServices.getSpecificCategory)
.patch(CategoryServices.updateSpecificCategory)
.delete(CategoryServices.deleteCategory)

module.exports= router;
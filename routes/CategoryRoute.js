const express = require("express");
const router = express.Router();
const CategoryServices = require("../services/Category")

router.route("/")
.get(CategoryServices.getCategory)
.post(CategoryServices.postCategory)


router.get("/:id",CategoryServices.getSpecificCategory)

module.exports= router;
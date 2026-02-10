const {param,body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const getCategoryValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

const createCategoryValidator=[
    body('name')
    .notEmpty()
    .isLength({min:5}).withMessage("name is required"),
    validatorMiddleware
]

const updateCategoryValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]
const deleteCategoryValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

module.exports={getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator}
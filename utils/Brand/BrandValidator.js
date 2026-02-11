const {param,body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const getBrandValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

const createBrandValidator=[
    body('name')
    .notEmpty()
    .isLength({min:5}).withMessage("name is required"),
    validatorMiddleware
]

const updateBrandValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]
const deleteBrandValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

module.exports={getBrandValidator,createBrandValidator,updateBrandValidator,deleteBrandValidator}
const {param,body} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const getsubCategoryValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

const createsubCategoryValidator=[
    body('name')
    .notEmpty()
    .isLength({min:4}).withMessage("name is too short")
    .custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),

     body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Category must be a valid Mongo ID'),
    validatorMiddleware
]

const updatesubCategoryValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    body('name').custom((val, { req }) => {
              req.body.slug = slugify(val);
              return true;
            }),
    validatorMiddleware
]
const deletesubCategoryValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

module.exports={createsubCategoryValidator,
    getsubCategoryValidator,
    updatesubCategoryValidator,
    deletesubCategoryValidator
}
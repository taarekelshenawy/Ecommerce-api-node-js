
const {param,body,check} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware =require('../middlewares/validatorMiddleware')
const User = require('../models/userModel');
const {FAIL}=require('../utils/httpStatusText');
const bcrypt=require('bcryptjs')



const signupValidator=[
    body('name')
    .notEmpty()
    .isLength({min:5}).withMessage("name is required"),
    body('name').custom((val, { req }) => {
          req.body.slug = slugify(val);
          return true;
        }),

    check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
        throw new Error('E-mail already exists'); // throw هنا بدل Promise.reject
        }
        return true;
    }),
    
      check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password, { req }) => {
              if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
              }
              return true;
            }),
        
          check('passwordConfirm')
            .notEmpty()
            .withMessage('Password confirmation required'),


    
    validatorMiddleware
]


const loginValidator=[
  
    check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
    
    
      check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password, { req }) => {
              if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
              }
              return true;
            }),
        
          check('passwordConfirm')
            .notEmpty()
            .withMessage('Password confirmation required'),


    
    validatorMiddleware
]

module.exports={signupValidator,loginValidator}
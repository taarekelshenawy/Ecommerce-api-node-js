
const {param,body,check} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware =require('../middlewares/validatorMiddleware')
const User = require('../models/userModel');
const {FAIL}=require('../utils/httpStatusText');
const bcrypt=require('bcryptjs')


const getUserValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

const createUserValidator=[
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


        check('phone')
           .optional()
           .isMobilePhone(['ar-EG', 'ar-SA'])
           .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),
       
        check('image').optional(),
        check('role').optional(),
    
    validatorMiddleware
]

const updateUserValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
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

    
        check('phone')
           .optional()
           .isMobilePhone(['ar-EG', 'ar-SA'])
           .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),
       
        check('image').optional(),
    

        
    validatorMiddleware
]
const deleteUserValidator=[
    param('id')
    .notEmpty()
    .withMessage('id param is required')
    .isMongoId()
    .withMessage('invalid mongo id format'),
    validatorMiddleware
]

const updatePasswordValidator=[
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

             check('currentPassword')  // <-- هنا validation للـ current password
                .notEmpty().withMessage('Current password is required')
                .custom(async (currentPassword, { req }) => {
                // req.params.id او req.user.id حسب وضعك
                const user = await User.findById(req.params.id); 
                if (!user) throw new Error('User not found');

                const isMatch = await bcrypt.compare(currentPassword, user.password);
                if (!isMatch) throw new Error('Current password is incorrect');

                return true;
                }),

         validatorMiddleware
]

const updateLoggedDataValidator=[
   
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

    
        check('phone')
           .optional()
           .isMobilePhone(['ar-EG', 'ar-SA'])
           .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),
       
      
    

        
    validatorMiddleware
]

module.exports={updateLoggedDataValidator,updatePasswordValidator,getUserValidator,createUserValidator,updateUserValidator,deleteUserValidator}
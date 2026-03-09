const asyncHandler = require('express-async-handler');
const User= require('../models/userModel');
const jwt=require('jsonwebtoken');
const bycript=require('bcryptjs');
const ApiError = require('../utils/appError');
const {FAIL}=require('../utils/httpStatusText');
const crypto = require('crypto');
const sendEmail=require('../utils/sendEmail')

const GenerateToken =(payload)=>{
       const token =jwt.sign({ userId:payload},process.env.JWT_SECRET_KEY,{expiresIn:'90d'});
       return token;
}

// signup new user
exports.signup=asyncHandler(async(req,res,next)=>{

    const user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })

    const token=GenerateToken(user._id)

    res.status(201).json({user:user,token:token})

})

// login 
exports.login=asyncHandler(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user || !(await bycript.compare(req.body.password,user.password))){
        return next(new ApiError("invalid email or password",401,FAIL))
    }
    const token=GenerateToken(user._id)

    res.status(200).json({user:user,token:token})

})

// protect routes
exports.protect=asyncHandler(async(req,res,next)=>{
    // 1(check if token exists)
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new ApiError("please you must login",401,FAIL))
    }
    // 2(check is token verifed)
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

    // 3(check is user exists with token)
    const currentuser = await User.findById(decoded.userId);
    if (!currentuser ) {
        return next(new ApiError("User no longer exists", 401));
    }
    // 4(check user not change password)
    if (currentuser.passwordChangedAt) {
   const passChangedTimestamp = parseInt(
      currentuser.passwordChangedAt.getTime() / 1000,
      10
   );

   if (passChangedTimestamp > decoded.iat) {
      return next(new ApiError("Password recently changed. Please login again", 401));
   }
}

req.user=currentuser;
console.log("the main user",req.user)

next()

})

// authroizaiton to admin,manager
exports.allowedTo=(...roles)=>
    asyncHandler(async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ApiError("you cant access this route",403,FAIL))
        }
        next();
  
})

// forget password
exports.forgetPassword=asyncHandler(async(req,res,next)=>{
    // 1(check if user exists)
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ApiError("If that email exists, a reset link has been sent",404,FAIL))
    }
     // 2) If user exist, Generate hash reset random 6 digits and save it in db
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');

       // Save hashed password reset code into db
        user.passwordResetCode = hashedResetCode;
        // Add expiration time for password reset code (10 min)
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        user.passwordResetVerified = false;

        await user.save();

          // 3) Send the reset code via email
          const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
          try {
            await sendEmail({
              email: user.email,
              subject: 'Your password reset code (valid for 10 min)',
              message,
            });
          } catch (err) {
             console.error("Email sending failed:", err);
            user.passwordResetCode = undefined;
            user.passwordResetExpires = undefined;
            user.passwordResetVerified = undefined;
        
            await user.save();
            return next(new ApiError('There is an error in sending email', 500));
          }
        
          res
            .status(200)
            .json({ status: 'Success', message: 'Reset code sent to email' });

   

        

})

// verify password
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError('Reset code invalid or expired'));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: 'Success',
  });
});


// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = GenerateToken(user._id);
  res.status(200).json({ token });
});


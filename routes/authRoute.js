const express = require("express");
const router = express.Router();
const {signupValidator,loginValidator}=require('../utils/authValidator')
const {signup,login,forgetPassword,verifyPassResetCode, resetPassword}= require("../services/authServices");


router.route("/signup")
.post(signupValidator,signup)

router.route("/login")
.post(loginValidator,login)

router.route("/forgetPassword")
.post(forgetPassword)

router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword );









module.exports= router;
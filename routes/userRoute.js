const express = require("express");
const router = express.Router();
const {protect}=require('../services/authServices')
const {updateLoggedDataValidator,updatePasswordValidator,getUserValidator,createUserValidator,updateUserValidator,deleteUserValidator}=require('../utils/userValidator')
const {DeactiveLoggedUserData,updateLoggedUserData,updateLoggedUserPassword,ChangePassowrd,getUsers,addUser,getSingleUser,updateUser,deleteUser,resizeImage,uploadUserImage,getLoggedUser}= require("../services/userServices");


router.route("/")
.get(getUsers)
.post(uploadUserImage,resizeImage,createUserValidator,addUser)

router.get('/getMe',protect,getLoggedUser,getSingleUser)
router.put('/updateMyPassword',protect,updateLoggedUserPassword)
router.put('/updateMyData',protect,updateLoggedDataValidator,updateLoggedUserData)
router.delete('/deleteMe',protect,DeactiveLoggedUserData)
router.route('/ChangePassword/:id').put(updatePasswordValidator,ChangePassowrd)

router.route("/:id")
.get(getUserValidator,getSingleUser)
.patch(uploadUserImage,resizeImage,updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser)



module.exports= router;
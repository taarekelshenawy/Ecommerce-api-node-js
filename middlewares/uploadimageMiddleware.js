
const multer  = require('multer');
const apiError = require('../utils/appError')
const {FAIL}=require('../utils/httpStatusText')

//  multer with no processing

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/categories')
//   },
//   filename: function (req, file, cb) {
//  const ext =file.mimetype.split('/')[1];
//   // نعمل رقم عشوائي من 0 لـ 999999
//     const randomNum = Math.floor(Math.random() * 1_000_000);
//     // اسم الملف النهائي
//     const fileName = `category-${Date.now()}-${randomNum}.${ext}`;
//  cb(null,fileName)
//   }
// })


exports.uploadSingleImage=(filedName)=>{

    const multerStorage=multer.memoryStorage();
    const multerfilter=(req, file, cb)=>{
        if(file.mimetype.startsWith('image')){
                cb(null,true)
            }else{
                cb(new apiError("must only images",400,FAIL))

            }

        }
        const uploadCategoyImage=multer({ storage:multerStorage,fileFilter:multerfilter})
        

        return uploadCategoyImage.single(filedName)
}
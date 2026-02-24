

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

const multer = require('multer');
const ApiError = require('../utils/appError');

const multerOptions = () => {

  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400,FAIL), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
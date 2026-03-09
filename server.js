const path = require('path');
require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const dbConnect=require("./Config/database");
const CategoryRouter = require("./routes/CategoryRoute");
const BrandRouter = require("./routes/BrandRoute");
const subCategoryRouter = require("./routes/subCategoryRoute");
const ProductRouter = require("./routes/ProductRoute");
const UserRouter = require('./routes/userRoute')
const AuthRouter = require('./routes/authRoute')
const ReviewsRouter = require('./routes/reviewsRoute')
const globalError=require('./middlewares/errorMiddleware')

const appError= require('./utils/appError');
const {FAIL,ERROR,SUCCESS}=require('./utils/httpStatusText')

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log(process.env.NODE_ENV )
}

dbConnect();

app.use("/api/Category",CategoryRouter);
app.use("/api/subCategory",subCategoryRouter);
app.use("/api/Brand",BrandRouter);
app.use("/api/products",ProductRouter);
app.use("/api/users",UserRouter);
app.use("/api/auth",AuthRouter);
app.use("/api/reviews",ReviewsRouter);

app.all(/.*/, (req, res, next) => {
  const error = new appError('this page is not found',404,ERROR)
  next(error)
})

app.use(globalError)



const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`app running in port ${PORT}`)
})

process.on('uncaughtException', (err) => {
  console.error('💥 uncaughtException! shutting down...');
  console.error(err.name, err.message);
  // ممكن تقفل السيرفر بشكل آمن
  process.exit(1);
});
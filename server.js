require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConnect=require("./Config/database");
const CategoryRouter = require("./routes/CategoryRoute")

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log(process.env.NODE_ENV )
}

dbConnect();

app.use("/api/Category",CategoryRouter);



const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`app running in port ${PORT}`)
})
require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect=()=>{
    const URL= process.env.MONGO_URL;
    mongoose.connect(URL).then(()=>{
        console.log("mongo connect success")
    })
}


module.exports=dbConnect;



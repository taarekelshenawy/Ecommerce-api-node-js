const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    ratings:{
        type:Number,
        min:[1,"min ratings review is 1.0"],
        max:[5,"max ratings review is 5.0"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:[true,"Review must belong to user"]
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
         required:[true,"Review must belong to product"]

    }

},{timestamps:true});





module.exports=mongoose.model('Review',reviewSchema)
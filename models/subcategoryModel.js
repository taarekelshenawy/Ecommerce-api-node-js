const mongoose = require('mongoose');

const subCategory = new mongoose.Schema({
      name:{
            type:String,
            required:[true,'must required'],
            unique:true,
            minlength:[3,"too short Category name"],
            maxlength:[32,"too most Category name"]
        }, 
        slug: {
            type:String,
            lowercase:true,
        },
        category:{
            type:mongoose.Schema.ObjectId,
            ref:'Category',
            required:[true,'subCategory must to be long parent category']
        }

},{timestamps:true});


module.exports =mongoose.model("subCategory",subCategory);
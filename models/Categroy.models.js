const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
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
},{timestamps:true})

module.exports=mongoose.model("Category",CategorySchema);
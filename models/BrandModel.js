const mongoose = require('mongoose')

const BrandSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'must required'],
    unique:true,
    minlength:[3,"too short Brand name"],
    maxlength:[32,"too most Brand name"]
  }, 
  slug: {
    type:String,
    lowercase:true,
  },
},{timestamps:true})

module.exports=mongoose.model("Brand",BrandSchema);
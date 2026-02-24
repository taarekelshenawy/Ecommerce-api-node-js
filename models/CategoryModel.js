const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'must required'],
    unique:true,
    minlength:[3,"too short Category name"],
    maxlength:[32,"too most Category name"]
  }, 
   image:{
    type:String
  },
  slug: {
    type:String,
    lowercase:true,
  },
},{timestamps:true})

const setImageURL=(doc)=>{
   if(doc.image){
    const imageURl=`${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image=imageURl
  }
}

CategorySchema.post('init', function(doc) {
  setImageURL(doc)
});

CategorySchema.post('save', function(doc) {
setImageURL(doc)
});

module.exports=mongoose.model("Category",CategorySchema);
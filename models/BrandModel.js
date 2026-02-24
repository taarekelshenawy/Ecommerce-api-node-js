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
  image:{
    type:String
  }
},{timestamps:true})

const setImageURL=(doc)=>{
   if(doc.image){
    const imageURl=`${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image=imageURl
  }
}

BrandSchema.post('init', function(doc) {
  setImageURL(doc)
});

BrandSchema.post('save', function(doc) {
setImageURL(doc)
});

module.exports=mongoose.model("Brand",BrandSchema);
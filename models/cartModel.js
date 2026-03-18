const mongoose =require('mongoose');

const cartSchema= new mongoose.Schema({
    cartItems:[
        {
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity: {
            type: Number,
            default: 1,
            },
            color:String,
            price:{
                type:Number,
                required:true,
            }
          
        }
    ],
    totalCartPrice:Number,
   totalPriceAfterDiscount:Number,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    }
})

module.exports=mongoose.model("Cart",cartSchema)
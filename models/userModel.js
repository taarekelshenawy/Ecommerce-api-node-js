const mongoose = require('mongoose')
const bycript=require('bcryptjs')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'name required'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    email:{
        type:String,
        unique:true,
        required:[true,'email required'],
        lowercase:true,
    },
    phone:String,
    image:String,
    password:{
        type:String,
        required:[true,'password required'],
        minlength: [6, 'Too short password'],
    },
    passwordChangedAt:Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role:{
        type:String,
        enum:["user",'admin',"manager"],
        default:'user',
    },
    active:{
        type:Boolean,
        default:true
    }
 

},{timestamps:true})

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bycript.hash(this.password, 12);
});

module.exports=mongoose.model('user',userSchema)
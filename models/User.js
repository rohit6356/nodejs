const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema} = mongoose;
const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserSchema = new Schema({
    name : {
         type : String,
         required : true
    },
    email : {
         type : String,
         required : true,
         unique : true
    },
    password: {
         type : String,
         required : true
    },
    token: {
         type : String,
    },
    date:{
    type : Date,
    default : new Date()
    }

})

 //create token
 const token = jwt.sign(
     { user_id : this._id },
     process.env.TOKEN_KEY,{
         expiresIn:"5h"
     }
     );

UserSchema.pre('save', async function(){
   if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password , 12)
     this.token = token;
   }
})


const User = mongoose.model('user' , UserSchema);
module.exports = User;
const express = require('express')
const jwt = require('jsonwebtoken')
const User =require('../models/User')
const router = express.Router();
const bcrypt = require('bcrypt')
const authentication = require('../middleware/authentication')

require('dotenv').config()
require('../db')

router.get('/' , (req,res) => {
    res.send("this is router home page");
})


// sign up router

router.post('/signup' , async(req,res) => {
   const {name , email ,password} = req.body;

try {
    const userExist = await User.findOne({email:email})
    if(userExist){
        return res.status(422).json({err : "email already registered"})
    }
    const user = new User({name:name, email:email, password:password});

    const userRegister = await user.save();

    if(userRegister){
        return res.status(201).json(user)
    }  
} catch (error) {
    console.log(error);
}

})

// login router

router.post('/signin' ,async(req,res) =>{
    const {email , password} = req.body;

    try {
    const userExist = await User.findOne({email:email})

    if(userExist){
        const isMatch = await bcrypt.compare(password , userExist.password)
        if(isMatch){
            //create token
              const token = jwt.sign(
                 { user_id : userExist._id },
                 process.env.TOKEN_KEY,{
                     expiresIn:"5h"
                 }
                 );
                 userExist.token = token;
                 await userExist.save();
            res.status(200).json(userExist)
        }
        else{
           res.status(400).json({mess : "plese login with correct credentials"}) 
        }
    }
    else{
         res.status(400).json({mess : "plese login with correct credentials"})
    }

    } catch (error) {
        console.log(error);
    }
})

// welcome

router.post('/welcome' , authentication , (req,res) =>{
    res.status(200).send("welcome🙌")
})


module.exports = router;

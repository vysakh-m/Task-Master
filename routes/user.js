const express=require('express');
const router = express();
const bodyParser = require("body-parser");
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const passport = require('passport');

const User=require('../models/user');
const List=require('../models/lists');


router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/register',(req,res)=>{
  User.findOne({email:req.body.email})
  .then(user=>{
    if(user){
      return res.status(400).json({
        status:"User found"
      })
    }else{
      const newUser= new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
      });
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) throw err;
          newUser.password=hash;
          newUser.save()
          .then(user=> res.json(user))
          .catch(err=> console.log(err))
        })
      })
    }
  })
})


module.exports=router;
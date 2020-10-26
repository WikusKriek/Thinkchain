
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')

require('dotenv').config();

let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const {username,email,password}=req.body;
  
  if(!username||!email||!password){
    return res.status(400).json({msg:"Please enter all fields!"});
  }
  User.findOne({email})
  .then(user=>{
    if(user) return res.status(400).json({msg:"User already exists"});
    
    
  
    
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,(err,hash)=>{
        if(err) throw err;
        
        const newUser = new User({username,email,password:hash,userRole:"admin"});
        newUser.save()
        .then(user =>{
          jwt.sign({
            
              id:user.id,
              username:user.username,
              email:user.email
              ,
              userRole:user.userRole
          },
          process.env.JWTSECRET,
          {expiresIn:3600},
          (err,token)=>{
            if(err) throw err;
            res.json({
              token,
              user:{
                id:user.id,
                username:user.username,
                email:user.email,
              },
              userRole:user.userRole
            })
          }
          )
          
          })
        .catch(err => res.status(400).json('Error: ' + err));
      })
    })
    
    
    
  }

  )
});

module.exports = router;
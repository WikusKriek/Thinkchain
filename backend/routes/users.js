
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const auth =require('../middleware/auth');

require('dotenv').config();

let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const {username,email,password,companyId}=req.body;
  
  if(!username||!email||!password){
    return res.status(400).json({msg:"Please enter all fields!"});
  }
  User.findOne({email})
  .then(user=>{
    if(user) return res.status(400).json({msg:"User already exists"});
    
    
  
    
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,(err,hash)=>{
        if(err) throw err;
        
        const newUser = new User({username,email,password:hash,userRole:"companyAdmin",companyId});
        newUser.save()
        .then(user1 =>{
          User.populate(user1, {path:"companyId"}, function(err, user) {
             
          if(!err){
          jwt.sign({
            
              id:user.id,
              username:user.username,
              email:user.email,
              userRole:user.userRole,
              companyId:user.companyId

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
                companyId:user.companyId
              },
              userRole:user.userRole
            })
          }
          )
        }
        });
          })
        .catch(err => res.status(400).json('Error: ' + err));
      })
    })
    
    
    
  }

  )
});

router.route('/updatePassword/').post(auth,(request, res) => {
  const {newpass,oldpass}=request.body;
  User.findById({'_id':request.user.id})
    .then(user => {
      bcrypt.compare(oldpass,user.password)
      .then( isMatch =>{
        if(!isMatch) return res.status(400).json({msg:'Invalid old password!'});
        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newpass,salt,(err,hash)=>{
          if(err) throw err;
          user.password=hash
          user.save()
        .then(() => res.json('User Password updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
        })
      })
    })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
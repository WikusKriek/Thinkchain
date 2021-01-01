
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const auth =require('../middleware/auth');

require('dotenv').config();

let User = require('../models/users.model');

router.route('/').post((req, res) => {
  const {email, password}=req.body;
 //simple validation
  if(!email||!password){
    return res.status(400).json({msg:"Please enter all fields!"});
  }
  //Check for existing user
  User.findOne({email})
  .populate({path:"companyId"}) 
  .exec((err,user)=>{
    if(!err){
    if(!user) return res.status(400).json({msg:"User does not exist!"});
    
    //Validate password
  bcrypt.compare(password,user.password)
  .then( isMatch =>{
      if(!isMatch) return res.status(400).json({msg:'Invalid credentials!'});
      
      jwt.sign({
        
        id:user.id,
        username:user.username,
        email:user.email,
        companyId:user.companyId
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
            companyId:user.companyId
          },
          userRole:user.userRole
        })
      }
      )
  }) 
}
  }
  )
});

router.route('/user').get(auth,(req,res)=>{
  User.findById(req.user.id)
  .select('-password')
  .then(user=> res.json(user));
});

module.exports = router;
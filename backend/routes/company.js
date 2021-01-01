
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')
const auth =require('../middleware/auth');

require('dotenv').config();

let Company = require('../models/company.model');

router.route('/').get((req, res) => {
  Company.find()
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const {companyName,email,password}=req.body;
  
  if(!companyName||!email||!password){
    return res.status(400).json({msg:"Please enter all fields!"});
  }
  Company.findOne({email})
  .then(company=>{
    if(company) return res.status(400).json({msg:"Company already exists"});
        
        const newCompany = new Company({companyName,email});
        newCompany.save()
        .then(company =>{
            res.json({
              company:{
                id:company.id,
                companyName:company.companyName,
                email:company.email,
              }
            })
          
          
          })
        .catch(err => res.status(400).json('Error: ' + err));

  }

  )
});

router.route('/update/:id').post(auth,(request, res) => {
    
  Company.findById(request.params.id)
    .then(company => {
      
      company.tel= request.body.tel;
      company.companyName = request.body.companyName;
      company.logo = request.body.logo;
      company.email = request.body.email;
      company.country =request.body.country;
      company.city = request.body.city;
      company.addressLine = request.body.addressLine;
      company.website = request.body.website;
      company.bio= request.body.bio;
      
      company.save()
        .then(() => res.json('Company updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
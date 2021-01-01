
const router = require('express').Router();

const auth =require('../middleware/auth');
const  nodemailer = require('nodemailer');

router.route('/').get(auth,(request,res) => {
  
  Suply.find({userId:request.user.id})
    .then(dataList => {
      
            res.json({ data: dataList })
    })
    .catch(err => {return [
      200,
      { error: err}
    ]});
});


router.route('/send/').post(auth,(request, res) => {
    console.log(window.document.getElementsByClassName("invoice-wrapper")[0])
    var htmlemail=window.document.getElementsByClassName("invoice-wrapper")[0]
    var htmlemail=request.email
    

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wikus.kriek.2w@gmail.com'
  }
});

var mailOptions = {
  from: 'wikus.kriek.2w@gmail.com',
  to: 'wikus.kriek.2w@gmail.com',
  subject: 'Sending Email using Node.js',
  text:"hi from Vuexy"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
     res.status(400).json('Error: ' + error)
  } else {
    console.log('Email sent: ' + info.response);
    res.json('Suplier added!')
  }
});
  
});



module.exports = router;
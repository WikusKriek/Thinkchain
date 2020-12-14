
const router = require('express').Router();
let Suply = require('../models/supplier.model');
const auth =require('../middleware/auth');

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
router.route('/list/').get(auth,(request,res) => {
  
  Suply.find({userId:request.user.id})
    .then(dataList => {
      let suplierList=[]
      for (data of dataList){
          suplierList.push({value:data["_id"],label:data.name,color: "#7367f0"})
      }
            res.json({ data: suplierList })
    })
    .catch(err => {return [
      200,
      { error: err}
    ]});
});

router.route('/initial').get((req, res) => {
  Suply.find()
    .then(
      
      supplier => res.json(supplier)
      
    )
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add-data').get((request, res) => {
  Suply.find()
    .then(
      
      dataList => {let data = JSON.parse(request.data).obj
        let highestId = Math.max.apply(
          Math,
          dataList.map(i => i.id)
        )
        dataList.unshift({
          ...data,
          id: highestId + 1
          
        })
        return [200]}
      
    )
    .catch(err => {return [
      200,
      { error: err}
    ]});
  
});

router.route('/add').post(auth,(request, res) => {
  const userId= request.user.id;
  const tel= request.body.tel;
  const name = request.body.name;
  const contactName = request.body.contactName;
  const contactSurname = request.body.contactSurname;
  const email = request.body.email;
  

  const newProduct = new Suply({userId,tel,name,contactName,contactSurname,email});

  newProduct.save()
    .then(() => res.json('Suplier added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Suply.findById(req.params.id)
      .then(supplier => res.json(supplier))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Suply.findByIdAndDelete(req.params.id)
      .then(() => res.json('Suply deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((request, res) => {
    
    Suply.findById(request.params.id)
      .then(supplier => {
        
        supplier.tel= request.body.tel;
        supplier.name = request.body.name;
        supplier.contactName = request.body.contactName;
        supplier.contactSurname = request.body.contactSurname;
        supplier.email = request.body.email;
        
        supplier.save()
          .then(() => res.json('Suplier updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
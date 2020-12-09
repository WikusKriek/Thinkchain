
const router = require('express').Router();
let Suply = require('../models/supplier.model');
const auth =require('../middleware/auth');

router.route('/').get(auth,(request,res) => {
  
  Suply.find({userId:request.user.id})
    .then(dataList => {
      
        let { page, perPage } = request.query
        
        let totalPages = Math.ceil(dataList.length / perPage)
        if (page !== undefined && perPage !== undefined) {
          let calculatedPage = (page - 1) * perPage
          let calculatedPerPage = page * perPage
          
            res.json({ data: dataList.slice(calculatedPage, calculatedPerPage), totalPages })
          
        } else {
          res.json( {data: dataList.slice(0, 4), totalPages: Math.ceil(dataList.length / 4) })
        }
      
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
  const number= request.body.number;
  const name = request.body.name;
  const salePrice = request.body.salePrice;
  const costPrice = request.body.costPrice;
  const qty = request.body.qty;
  const consignment = request.body.consign;
  const packaging = request.body.packaging;
  const minQty = request.body.minQty;
  const recQty = request.body.recQty;

  const newProduct = new Suply({userId,number,name,salePrice,costPrice,qty,consignment,packaging,minQty,recQty});

  newProduct.save()
    .then(() => res.json('Suply added!'))
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
        
        supplier.number= request.body.number;
        supplier.name = request.body.name;
        supplier.salePrice = request.body.salePrice;
        supplier.costPrice = request.body.costPrice;
        supplier.qty = request.body.qty;
        supplier.consignment = request.body.consign;
        supplier.packaging = request.body.packaging;
        supplier.minQty = request.body.minQty;
        supplier.recQty = request.body.recQty;
        
  
        supplier.save()
          .then(() => res.json('Suply updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
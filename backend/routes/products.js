
const router = require('express').Router();
let Product = require('../models/products.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userId= req.body.userId;
  const number= req.body.number;
  const name = req.body.name;
  const salePrice = req.body.salePrice;
  const costPrice = req.body.costPrice;
  const qty = req.body.qty;
  const consignment = req.body.consignment;
  const packaging = req.body.packaging;
  const minQty = req.body.minQty;
  const recQty = req.body.recQty;

  const newProduct = new Product({userId,number,name,salePrice,costPrice,qty,consignment,packaging,minQty,recQty});

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        product.username = req.body.username;
        product.description = req.body.description;
        product.subject = req.body.subject;
        
  
        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
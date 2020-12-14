
const router = require('express').Router();
let Product = require('../models/products.model');
const auth =require('../middleware/auth');

router.route('/').get(auth,(request,res) => {
  
  Product.find({userId:request.user.id})
    .then(dataList => {    
    res.json({ data: dataList })
    })
    .catch(err => {return [
      200,
      { error: err}
    ]});
});


router.route('/supplier/:id').get(auth,(request,res) => {
  
  Product.find({supplierId:request.params.id})
    .then(dataList => {
      let productList=[]
      for (data of dataList){
          productList.push({value:data["_id"],label:data.name,color: "#7367f0",product:data})
      }
            res.json({ data: productList })
    })
    .catch(err => {return [
      200,
      { error: err}
    ]});
});

router.route('/initial').get((req, res) => {
  Product.find()
    .then(
      
      product => res.json(product)
      
    )
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add-data').get((request, res) => {
  Product.find()
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
  const supplierId= request.body.supplierId;
  const number= request.body.number;
  const name = request.body.name;
  const salePrice = request.body.salePrice;
  const costPrice = request.body.costPrice;
  const qty = request.body.qty;
  const consignment = request.body.consign;
  const packaging = request.body.packaging;
  const minQty = request.body.minQty;
  const recQty = request.body.recQty;

  const newProduct = new Product({userId,number,name,salePrice,costPrice,qty,consignment,packaging,minQty,recQty,supplierId});

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
  
  router.route('/update/:id').post((request, res) => {
    
    Product.findById(request.params.id)
      .then(product => {
        
        product.number= request.body.number;
        product.name = request.body.name;
        product.salePrice = request.body.salePrice;
        product.costPrice = request.body.costPrice;
        product.qty = request.body.qty;
        product.consignment = request.body.consignment;
        product.packaging = request.body.packaging;
        product.minQty = request.body.minQty;
        product.recQty = request.body.recQty;
        
  
        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
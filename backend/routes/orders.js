
const router = require('express').Router();
let Order = require('../models/orders.model');
const auth =require('../middleware/auth');

router.route('/').get(auth,(request,res) => {
  
  Order.find({userId:request.user.id})
  .populate({path:'supplierId'}).
  populate ({ path:'products.product'})
    .exec((error,dataList) => {
      
            
            if (error) { 
              console.log(error);}
            else{
            res.json({ data: dataList });
            }
    })
    
});

router.route('/initial').get((req, res) => {
  Order.find()
    .then(
      
      orders => res.json(orders)
      
    )
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add-data').get((request, res) => {
  Order.find()
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
  const supplierName = request.body.supplierName;
  const supplierId = request.body.supplierId;
  const orderDate = request.body.orderDate;
  const status = request.body.status;
  const paid = request.body.paid;
  const recieved = request.body.recieved;
  const products=request.body.products;
  var orderId='0'
 Order.find()
 .select("orderId")
 .sort([["orderId",-1]] )
 .limit(1)
 .exec((error,entry)=>{
   
  var year=new Date().getFullYear()
   if(entry[0]){
  var id=entry[0].orderId
  
  if(id){
    var number=parseInt(id.split("/"));
    if (number) { 
      number=number+1
       orderId= number.toString()+"/"+year;
    }
  
  
  }
    else{
      orderId= "1/"+year;
  }
  }else{
  orderId= "1/"+year;
  }

const newProduct = new Order({userId,orderId,supplierId,supplierName,orderDate,status,paid,recieved,products});

  newProduct.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
 });
  

 
});

router.route('/:id').get((req, res) => {
    Order.findById(req.params.id)
    .populate({path:'supplierId'}).
    populate ({ path:'products.product'})
      .exec((error,dataList) => {
        
              
              if (error) { 
                console.log(error);}
              else{
              res.json({ data: dataList });
              }
      })
  });

  router.route('/ordersByStatus/').post(auth,(request, res) => {
    Order.find({userId:request.user.id})
    .where("status").equals(request.body.status)
  .populate({path:'supplierId'}).
  populate ({ path:'products.product'})
    .exec((error,dataList) => {
      
            
            if (error) { 
              console.log(error);}
            else{
            res.json({ data: dataList });
            }
    })
  });
  
  router.route('/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
      .then(() => res.json('Order deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((request, res) => {
    
    Order.findById(request.params.id)
      .then(orders => {
        orders.supplierName = request.body.supplierName;
        orders.supplierId = request.body.supplierId;
        orders.orderDate = request.body.orderDate;
        orders.status = request.body.status;
        orders.paid = request.body.paid;
        orders.recieved = request.body.recieved;
        orders.products =request.body.products;
        
        
        orders.save()
          .then(() => res.json('Order updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;


router.route('/updateStatus/:id').post((request, res) => {
    
  Order.findById(request.params.id)
    .then(orders => {
      orders.status = request.body.status;
      orders.save()
        .then(() => res.json('Order updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
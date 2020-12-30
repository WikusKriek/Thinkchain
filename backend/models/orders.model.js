const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId:{ type: String, required: true },
  orderId: { type: String, required: true },
  supplierId: { type: Schema.Types.ObjectId, required: true, ref:"supplier"},
  orderDate: { type: String, required: true },
  updated: { type: Date, default: Date.now },
  status: { type: String, required: true },
  reference: { type: String },
  paid: { type: Boolean, default: false },
  recieved: { type: Boolean, default: false },
  products:[{
    _id: false,
    product: { type: Schema.Types.ObjectId, ref:"products"},
    qty: { type: Number },
    vat: { type: Number },
    subtotal: { type:Number }
    
  }]
  

}, {
  timestamps: true,
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
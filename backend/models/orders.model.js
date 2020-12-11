const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId:{ type: String, required: true },
  orderId: { type: String, required: true },
  supplierName: { type: String, required: true },
  supplierId: { type: String, required: true },
  orderDate: { type: String, required: true },
  status: { type: String, required: true },
  

}, {
  timestamps: true,
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
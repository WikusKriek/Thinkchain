const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  userId:{ type: String, required: true },
  number: { type: String, required: true },
  name: { type: String, required: true },
  salePrice: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  qty: { type: Number, required: true },
  consignment: { type: Boolean, required: true },
  packaging: { type: Boolean, required: true },
  minQty: { type: Number, required: true },
  recQty: { type: Number, required: true }

}, {
  timestamps: true,
});

const Supplier = mongoose.model('supplier', supplierSchema);

module.exports = Supplier;
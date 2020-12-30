const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId, required: true },
  tel: { type: Number, required: true },
  name: { type: String, required: true },
  contactName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  addressLine: { type: String, required: true },
  taxNumber: { type: Number, required: true },
  

}, {
  timestamps: true,
});

const Supplier = mongoose.model('supplier', supplierSchema);

module.exports = Supplier;
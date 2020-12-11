const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  userId:{ type: String, required: true },
  tel: { type: Number, required: true },
  name: { type: String, required: true },
  contactName: { type: String, required: true },
  contactSurname: { type: String, required: true },
  email: { type: String, required: true },
  

}, {
  timestamps: true,
});

const Supplier = mongoose.model('supplier', supplierSchema);

module.exports = Supplier;
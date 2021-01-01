const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  addressLine: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  tel: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
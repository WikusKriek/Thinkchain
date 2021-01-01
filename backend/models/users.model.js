const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  userRole: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  companyId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    required: true ,
    ref:"Company"
  },
}, 
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
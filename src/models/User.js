const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { pick } = require('../utils/fn');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  role: {
    type: String
  },
  phone: {
    type: String
  },
  profileImage: {
    type: String
  },
  country: {
    type: String
  },
  state: { // does it uses anywhere now? looks like nowhere
    type: String
  },
  city: {
    type: String
  },
  postcode: {
    type: String
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  birthday: {
    type: String
  },
  activated: {
    type: Boolean,
    default: false,
  },
}, {
  collection: 'users',
  timestamps: true
});


UserSchema.index({ email: 1 }, { unique: true });

UserSchema.virtual('publicData').get(function () {
  const data = pick(this, ['id', 'name', 'email', 'phone', 'firstName', 'lastName', 'role']);
  
  return data;
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model('users', UserSchema);

module.exports = User;

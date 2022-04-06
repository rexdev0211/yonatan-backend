const mongoose = require('mongoose');
const { pick } = require('../utils/fn');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
}, {
  collection: 'cartItems',
  timestamps: true
});

CartItemSchema.virtual('publicData').get(function() {
  const picked = pick(this, ['id', 'product', 'user', 'quantity']);
  const { product, user } = picked;
  return {
    ...picked,
    product: product && product.publicData ? product.publicData : product && product.toString(),
    user: user && user.publicData ? user.publicData : user && user.toString()
  };
});

module.exports = mongoose.model('cartItems', CartItemSchema);

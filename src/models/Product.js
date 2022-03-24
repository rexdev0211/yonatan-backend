const mongoose = require('mongoose');
const { pick } = require('../utils/fn');

const ProductSchema = new mongoose.Schema({
  sku: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  new: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number
  },
  ratingCount: {
    type: Number,
    default: 5
  },
  saleCount: {
    type: Number
  },
  category: [{
    type: String,
    required: true
  }],
  tag: [{
    type: String
  }],
  variation: [{
    color: {
      type: String
    },
    colorCode: {
      type: String
    },
    image: {
      type: String
    },
    size: [{
      name: {
        type: String
      },
      stock: {
        type: Number
      }
    }]
  }],
  stock: {
    type: Number
  },
  thumbImage: [{
    type: String
  }],
  image: [{
    type: String
  }],
  shortDescription: {
    type: String
  },
  fullDescription: {
    type: String
  }
}, {
  collection: 'products',
  timestamps: true
});

ProductSchema.virtual('publicData').get(function() {
  const picked = pick(this, [ 'id', 'sku', 'name', 'slug', 'price', 'discount', 'new', 'rating', 'ratingCount', 'saleCount', 'category', 'tag', 'variation', 'stock', 'thumbImage', 'image', 'shortDescription', 'fullDescription' ]);
  return picked;
});

module.exports = mongoose.model('products', ProductSchema);

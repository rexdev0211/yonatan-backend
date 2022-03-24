const Product = require('../../models/Product');

async function create(data) {
  const product = await Product.create(data);
  
  return product.publicData;
}

async function update(productId, data) {
  const product = await Product.findByIdAndUpdate(productId, data, { new: true });
  
  return product.publicData;
}

async function identity(productId) {
  const product = await Product.findById(productId);
  if (!product) return null;

  return product.publicData;
}

async function remove(productId) {
  await Product.findByIdAndRemove(productId);
}

async function list({ skip, limit, category, search }) {
  const query = {};
  if (search) query.name = { $regex: search || '', $options: 'i' };

  const [ count, data ] = await Promise.all([
    Product.count(query),
    Product.find(query).sort({ updatedAt: -1 }).skip(skip).limit(limit)
  ]);

  const publicData = data.map(x => x.publicData);
  return { count, data: publicData };
}

module.exports = {
  identity,
  list,
  create,
  update,
  remove,
}

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
  const product = await Product.findOne({ slug: productId });
  if (!product) return null;

  return product.publicData;
}

async function remove(productId) {
  await Product.findByIdAndRemove(productId);
}

async function list({ skip, limit, search, sortType, sortValue, filterSortType, filterSortValue }) {
  const query = {};
  const sortQuery = {};
  if (search) query.name = { $regex: search || '', $options: 'i' };
  if (sortType && sortValue) {
    if (sortType === 'category') query['category'] = sortValue;
    if (sortType === 'color') query['variation.color'] = sortValue;
    if (sortType === 'size') query['variation.size.name'] = sortValue;
    if (sortType === 'tag') query['tag'] = sortValue;
  }
  if (filterSortType && filterSortValue) sortQuery[filterSortType] = filterSortValue === 'asc' ? 1 : -1;

  const [ count, data ] = await Promise.all([
    Product.count(query),
    Product.find(query).sort(sortQuery).skip(skip).limit(limit)
  ]);

  const publicData = data.map(x => x.publicData);
  return { count, data: publicData };
}

async function popularList({ limit }) {
  const popularProducts = await Product.find({}).sort({ saleCount: -1 }).skip(0).limit(limit);

  return popularProducts.map(x => x.publicData);
}

module.exports = {
  identity,
  list,
  create,
  update,
  remove,
  popularList,
}

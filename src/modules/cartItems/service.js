const CartItem = require('../../models/CartItem');

async function create(user, data) {
  const cartItem = await CartItem.create({ ...data, user });
  
  return cartItem.publicData;
}

async function update(user, cartItemId, data) {
  const cartItem = await CartItem.findByIdAndUpdate(cartItemId, { ...data, user }, { new: true });
  if (!cartItem) return null;
  
  return cartItem.publicData;
}

async function identity(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate('product');
  if (!cartItem) return null;

  return cartItem.publicData;
}

async function remove(cartItemId) {
  await CartItem.findByIdAndRemove(cartItemId);
}

async function list(user, { skip, limit, search }) {
  const query = { user };
  const sortQuery = {};
  if (search) query.name = { $regex: search || '', $options: 'i' };

  const [ count, data ] = await Promise.all([
    CartItem.count(query),
    CartItem.find(query).populate('product').sort(sortQuery).skip(skip).limit(limit)
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

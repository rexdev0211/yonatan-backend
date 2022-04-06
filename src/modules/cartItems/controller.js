const service = require('./service');

async function create(ctx) {
  const { request: { body }, user } = ctx.state;
  ctx.body = await service.create(user.id, body);
}

async function update(ctx) {
  const { request: { body, params: { cartItemId } }, user } = ctx.state;
  ctx.body = await service.update(user.id, cartItemId, body);
}

async function list(ctx) {
  const { request: { query }, user } = ctx.state;
  ctx.body = await service.list(user.id, query);
}

async function identity(ctx) {
  const { params: { cartItemId } } = ctx.state.request;
  ctx.body = await service.identity(cartItemId);
}

async function remove(ctx) {
  const { params: { cartItemId } } = ctx.state.request;
  await service.remove(cartItemId);
  ctx.body = null;
}

module.exports = {
  identity,
  list,
  create,
  update,
  remove,
}

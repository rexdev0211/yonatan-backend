const service = require('./service');

async function create(ctx) {
  const { request: { body } } = ctx.state;
  ctx.body = await service.create(body)
}

async function update(ctx) {
  const { request: { body, params: { productId } } } = ctx.state;
  ctx.body = await service.update(productId, body);
}

async function list(ctx) {
  const { request: { query } } = ctx.state;
  ctx.body = await service.list(query);
}

async function identity(ctx) {
  const { params: { productId } } = ctx.state.request;
  ctx.body = await service.identity(productId);
}

async function remove(ctx) {
  const { params: { productId } } = ctx.state.request;
  await service.remove(productId);
  ctx.body = null;
}

async function popularList(ctx) {
  const { request: { query } } = ctx.state;
  ctx.body = await service.popularList(query);
}

module.exports = {
  identity,
  list,
  create,
  update,
  remove,
  popularList,
}

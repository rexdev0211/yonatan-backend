const Router = require('koa-router');
// const sessionChecker = require('../../middlewares/sessionChecker');
// const accessChecker = require('../../middlewares/accessChecker');
const validate = require('../../middlewares/validate');
const { create, update, list, identity, remove, popularList } = require('./controller');
const { listRequest, createRequest, updateRequest, identityRequest, deleteRequest, popularListRequest } = require('./validators');

module.exports = new Router()
  // .use(sessionChecker)
  .get('/', validate(listRequest), list)
  .get('/:productId', validate(identityRequest), identity)
  .post('/', validate(createRequest), create)
  .put('/:productId', validate(updateRequest), update)
  .delete('/:productId', validate(deleteRequest), remove)
  .get('/popular/list', validate(popularListRequest), popularList)

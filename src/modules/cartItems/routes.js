const Router = require('koa-router');
const sessionChecker = require('../../middlewares/sessionChecker');
// const accessChecker = require('../../middlewares/accessChecker');
const validate = require('../../middlewares/validate');
const { create, update, list, identity, remove } = require('./controller');
const { listRequest, createRequest, updateRequest, identityRequest, deleteRequest } = require('./validators');

module.exports = new Router()
  .use(sessionChecker)
  .get('/', validate(listRequest), list)
  .get('/:cartItemId', validate(identityRequest), identity)
  .post('/', validate(createRequest), create)
  .put('/:cartItemId', validate(updateRequest), update)
  .delete('/:cartItemId', validate(deleteRequest), remove)

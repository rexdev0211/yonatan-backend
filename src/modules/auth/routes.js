const Router = require('koa-router');
const validate = require('../../middlewares/validate');
const { login, logout, register } = require('./controller');
const { loginRequest, registerRequest } = require('./validators');

module.exports = new Router()
  .post('/register', validate(registerRequest), register)
  .post('/login', validate(loginRequest), login)
  .post('/logout', logout)

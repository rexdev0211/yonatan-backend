const Router = require('koa-router')
const errorHandler = require('./middlewares/errorHandler')
const ipHandler = require('./middlewares/ipHandler')
const products = require('./modules/products/routes')

module.exports = new Router({ prefix: '/api' })
  .use(errorHandler)
  .use(ipHandler)
  .use('/products', products.routes())

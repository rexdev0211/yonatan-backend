const Router = require('koa-router')
const errorHandler = require('./middlewares/errorHandler')
const ipHandler = require('./middlewares/ipHandler')
const auth = require('./modules/auth/routes')
const products = require('./modules/products/routes')
const cartItems = require('./modules/cartItems/routes')

module.exports = new Router({ prefix: '/api' })
  .use(errorHandler)
  .use(ipHandler)
  .use('/auth', auth.routes())
  .use('/products', products.routes())
  .use('/cartItems', cartItems.routes())

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('./middlewares/cors');
const logger = require('./utils/logger');
const httpLogger = require('./utils/httpLogger');
const db = require('./db');
const api = require('./routes');
const { messageJobChanel, ChanelNames } = require('./eventEmitter');
const { APP_PORT, COOKIE_KEYS, CORS_ORIGINS } = require('./config');
const withTimeout = require('./middlewares/withTimeout');


module.exports = async function (worker) {
  await db.init();
  const app = new Koa();
  app.keys = COOKIE_KEYS;
  app.timeout = 10 * 60 * 1000; // global upper limit is 10 minutes for long requests

  messageJobChanel.receive((data) => worker.send({ ...data, messageType: ChanelNames.MessageJob }));

  app
    .use(httpLogger)
    .use(withTimeout(120)) // default 2 minuties timeout
    .use(koaBody({ includeUnparsed: true }))
    .use(cors({
      maxAge: '600',
      credentials: true,
      origins: CORS_ORIGINS,
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      allowHeaders: ['Content-Type', 'Authorization'],
      exposeHeaders: ['Content-Length', 'Date', 'Cache-Value'],
      keepHeadersOnError: true
    }))
    .use((ctx, next) => {
      if (process.env.NODE_ENV === 'production') ctx.cookies.secure = true;
      return next();
    })
    .use(api.routes())
    .listen(APP_PORT, () => logger.info(`Start server on ${APP_PORT}`));
}

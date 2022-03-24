const logger = require('./logger');

const untraceableEndpoints = [
  '/api/auth/login',
  '/api/users/artist'
]

module.exports = async(ctx, next) => {

  const { originalUrl, method } = ctx;
  if (method === 'POST' && untraceableEndpoints.some(x => originalUrl.includes(x))) return next();

  const isHealthCheckCall = originalUrl.endsWith('healthcheck');
  if (!isHealthCheckCall)
    logger.debug(`--> ${ method } ${ originalUrl }`, JSON.stringify(ctx.request.body));

  await next();

  if (!isHealthCheckCall || ctx.status !== 200)
    logger.debug(`<-- ${ ctx.status } ${ method } ${ originalUrl }`, JSON.stringify(ctx.response.body));
};

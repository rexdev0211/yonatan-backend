const { ForbiddenError } = require('../errors');
const { ACCESS_DENIED } = require('../errorCodes');

module.exports = function(userRole) {
  return async function(ctx, next) {
    const { user } = ctx.state;
    if (!user || user.role !== userRole) throw new ForbiddenError(ACCESS_DENIED)
    return next();
  }
}

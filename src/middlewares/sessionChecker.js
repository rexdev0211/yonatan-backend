const User = require('../models/User')
const { NotAuthorizedError } = require('../errors')
const { NOT_AUTHORIZED } = require('../errorCodes')

module.exports = async function (ctx, next) {
  ctx.userId = ctx.cookies.get('userId')
  if (!ctx.userId) throw new NotAuthorizedError(NOT_AUTHORIZED)
  const user = await User.findById(ctx.userId)

  // deleted state check - it's extra check for security reson
  if (!user || user.markedAsDeleted?.deleted)
    throw new NotAuthorizedError(NOT_AUTHORIZED)
  ctx.state.user = user
  await next()
}

const User = require('../models/User');

module.exports = async function(ctx, next) {
  ctx.userId = ctx.cookies.get('userId');
  let user = null;
  if (ctx.userId) user = await User.findById(ctx.userId);
  ctx.state.user = user;
  await next();
}

const service = require('./service');

const TWO_WEEKS = 1209600000;

async function login(ctx) {
  const { body: { email, password } } = ctx.state.request;
  const userData = await service.login(email, password);
  ctx.body = userData;
  const opts = { signed: true, overwrite: true, maxAge: TWO_WEEKS };
  ctx.cookies.set('userId', userData.id, opts);
}

function logout(ctx) {
  ctx.cookies.set('userId', '', { signed: true, overwrite: true });
  ctx.body = null;
}

async function register(ctx) {
  const { body: { email, password } } = ctx.state.request;

  const user = await service.getUserByEmail(email);
  if (user) {
    ctx.body = 'Email already exists';
    return;
  }

  const newUser = await service.register(email, password);

  ctx.body = newUser;
}

module.exports = {
  login,
  logout,
  register,
}

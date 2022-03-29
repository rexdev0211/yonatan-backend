const User = require('../../models/User');
const cryptService = require('../../services/crypt');
const { NotAuthorizedError } = require('../../errors');
const { USER_DATA_INCORRECT } = require('../../errorCodes');

async function login(email, password) {
  const user = await User.findOne({ email: { $regex: `^${email}$`, $options: 'i' } });
  if (!user) throw new NotAuthorizedError(USER_DATA_INCORRECT);

  const isPasswordCorrect = await user.validatePassword(password);
  if (!isPasswordCorrect) throw new NotAuthorizedError(USER_DATA_INCORRECT);

  return user.publicData;
}

async function getUserByEmail(email) {
  return User.findOne({ email: { $regex: `^${email || ''}$`, $options: 'i' } });
}

async function register(email, password) {
  const passwordHash = await cryptService.hash(password);
  return await User.create({ email, password: passwordHash });
}

module.exports = {
  login,
  getUserByEmail,
  register,
}

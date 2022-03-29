require('dotenv').config();

module.exports = {
  ...process.env,
  COOKIE_KEYS: process.env.COOKIE_KEYS?.split(','),
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(','),
};

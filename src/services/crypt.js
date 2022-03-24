const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const { CRYPT_SECRET, PAYMENT_API_KEY } = require('../config');

const SALT_VALUE = 10;

async function hash(value) {
  const salt = await bcrypt.genSalt(SALT_VALUE);
  return bcrypt.hash(value, salt);
}

function encrypt(message) {
  return CryptoJS.AES.encrypt(message, CRYPT_SECRET).toString();
}

function decrypt(ciphertext) {
  const bytes  = CryptoJS.AES.decrypt(ciphertext, CRYPT_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function paymentEncrypt(paymentString) {
  const sha256 = CryptoJS.SHA256(paymentString);
  const hmac = CryptoJS.HmacSHA256(sha256,  PAYMENT_API_KEY);
  return hmac.toString();
}

module.exports = {
  hash,
  encrypt,
  decrypt,
  paymentEncrypt
}

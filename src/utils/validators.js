const { Types } = require('mongoose');

function isObjectId(x) {
  return Types.ObjectId.isValid(x);
}

function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function isFilledString(s) {
  if (typeof s !== 'string') return false;
  s = s.trim();
  return isString(s) && Boolean(s.length);
}

function isNumber(e) {
  return typeof e === 'number' || e instanceof Number
}

function isArray(e) {
  return Array.isArray(e)
}

function isArrayItemsUnique(e) {
  return [...new Set(e)].length === e.length;
}

function isDate(d) {
  return !Number.isNaN(Date.parse(d));
}

function isBoolean(v) {
  return (typeof v === 'boolean' || v instanceof Boolean);
}

function isObjectFieldsString(obj) {
  return Object.values(obj).reduce((acc, el) => acc = !acc ? acc : isString(el), true);
}


function isObject(obj) {
  return typeof obj === 'object' || obj !== null;
}

module.exports = {
  isObjectId,
  isFilledString,
  isNumber,
  isString,
  isDate,
  isArray,
  isArrayItemsUnique,
  isBoolean,
  isObjectFieldsString,
  isObject
}

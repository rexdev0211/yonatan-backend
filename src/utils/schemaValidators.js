const trava = require('trava');
const validators = require('./validators');
const { Check, Compose } = trava;

const isFilledString = Check(validators.isFilledString);
const isNumber = Check(validators.isNumber);
const isPositiveNumber = Compose([isNumber, Check((x) => x > 0, 'Value should be positive number')]);
const isPositiveAndZeroNumber = Compose([isNumber, Check((x) => x >= 0, 'Value should be greater or equal to zero')]);
const isString = Check(validators.isString);
const isObjectId = Check(validators.isObjectId);
const isArray = Check(validators.isArray);
const isArrayItemsUnique = Check(validators.isArrayItemsUnique, 'array items are not unique');
const isStringInteger = Check((x) => !isNaN(parseInt(x, 10)));
const isStringPositiveNumber = Check((x) => !isNaN(x) && !isNaN(parseFloat(x)) && parseFloat(x) >= 0);
const isDate = Check(validators.isDate);
const isBoolean = Check(validators.isBoolean);
const isObjectFieldsString = Check(validators.isObjectFieldsString);
const isObject = Check(validators.isObject);

module.exports = {
  isFilledString,
  isNumber,
  isPositiveNumber,
  isPositiveAndZeroNumber,
  isString,
  isObjectId,
  isDate,
  isStringInteger,
  isStringPositiveNumber,
  isArray,
  isArrayItemsUnique,
  isBoolean,
  isObjectFieldsString,
  isObject
}

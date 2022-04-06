const trava = require('trava');
const { Optional, Compose } = trava;
const { isFilledString, isNumber, isObjectId, isString, isStringInteger } = require('../../utils/schemaValidators');

const createRequest = trava({
  request: {
    body: {
      product: isObjectId,
      quantity: isNumber,
    }
  }
});

const updateRequest = trava({
  params: { cartItemId: isObjectId },
  request: {
    body: {
      product: isObjectId,
      quantity: isNumber,
    }
  }
});

const identityRequest = trava({
  params: { cartItemId: isFilledString }
})

const listRequest = trava({
  query: {
    skip: Compose([isStringInteger, (v) => parseInt(v)]),
    limit: Compose([isStringInteger, (v) => parseInt(v)]),
    search: Optional(isString),
  }
});

const deleteRequest = trava({
  params: { cartItemId: isObjectId },
})

module.exports = {
  createRequest,
  updateRequest,
  listRequest,
  identityRequest,
  deleteRequest,
}

const trava = require('trava');
const { Optional, Compose, Each } = trava;
const { isArray, isArrayItemsUnique, isBoolean, isFilledString, isNumber, isObjectId, isPositiveNumber, isString, isStringInteger } = require('../../utils/schemaValidators');

const createRequest = trava({
  request: {
    body: {
      sku: isFilledString,
      name: isFilledString,
      slug: Optional(isFilledString),
      price: isPositiveNumber,
      discount: Optional(isPositiveNumber),
      new: Optional(isBoolean),
      rating: Optional(isPositiveNumber),
      ratingCount: Optional(isPositiveNumber),
      saleCount: Optional(isPositiveNumber),
      category: Compose([isArray, isArrayItemsUnique, Each(isFilledString)]),
      tag: Optional(Compose([isArray, isArrayItemsUnique, Each(isFilledString)])),
      variation: Optional(isArray),
      stock: Optional(isNumber),
      thumbImage: Optional(Compose([isArray, isArrayItemsUnique, Each(isFilledString)])),
      image: Optional(Compose([isArray, isArrayItemsUnique, Each(isFilledString)])),
      shortDescription: isString,
      fullDescription: isString,
    }
  }
});

const updateRequest = trava({
  params: { productId: isObjectId },
  request: {
    body: {
      sku: isFilledString,
      name: isFilledString,
      slug: Optional(isFilledString),
      price: isPositiveNumber,
      discount: Optional(isPositiveNumber),
      new: Optional(isBoolean),
      rating: Optional(isPositiveNumber),
      ratingCount: Optional(isPositiveNumber),
      saleCount: Optional(isPositiveNumber),
      category: Compose([isArray, isArrayItemsUnique, Each(isFilledString)]),
      tag: Optional(Compose([isArray, isArrayItemsUnique, Each(isFilledString)])),
      variation: Optional(isArray),
      stock: Optional(isNumber),
      thumbImage: Optional(Compose([isArray, isArrayItemsUnique, Each(isFilledString)])),
      image: Optional(Compose([isArray, isArrayItemsUnique, Each(isFilledString)])),
      shortDescription: isString,
      fullDescription: isString,
    }
  }
});

const identityRequest = trava({
  params: { productId: isObjectId }
})

const listRequest = trava({
  query: {
    skip: Compose([isStringInteger, (v) => parseInt(v)]),
    limit: Compose([isStringInteger, (v) => parseInt(v)]),
    category: Optional(isFilledString),
    search: Optional(isString)
  }
});

const deleteRequest = trava({
  params: { productId: isObjectId },
})

module.exports = {
  createRequest,
  updateRequest,
  listRequest,
  identityRequest,
  deleteRequest
}

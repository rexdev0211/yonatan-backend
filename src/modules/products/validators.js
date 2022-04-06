const trava = require('trava');
const { Optional, Compose, Each } = trava;
const { isArray, isArrayItemsUnique, isBoolean, isFilledString, isNumber, isObjectId, isPositiveAndZeroNumber, isString, isStringInteger } = require('../../utils/schemaValidators');

const createRequest = trava({
  request: {
    body: {
      sku: isFilledString,
      name: isFilledString,
      slug: Optional(isFilledString),
      price: isPositiveAndZeroNumber,
      discount: Optional(isPositiveAndZeroNumber),
      new: Optional(isBoolean),
      rating: Optional(isPositiveAndZeroNumber),
      ratingCount: Optional(isPositiveAndZeroNumber),
      saleCount: Optional(isPositiveAndZeroNumber),
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
      price: isPositiveAndZeroNumber,
      discount: Optional(isPositiveAndZeroNumber),
      new: Optional(isBoolean),
      rating: Optional(isPositiveAndZeroNumber),
      ratingCount: Optional(isPositiveAndZeroNumber),
      saleCount: Optional(isPositiveAndZeroNumber),
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
  params: { productId: isFilledString }
})

const listRequest = trava({
  query: {
    skip: Compose([isStringInteger, (v) => parseInt(v)]),
    limit: Compose([isStringInteger, (v) => parseInt(v)]),
    search: Optional(isString),
    sortType: Optional(isString),
    sortValue: Optional(isString),
    filterSortType: Optional(isString),
    filterSortValue: Optional(isString),
  }
});

const popularListRequest = trava({
  query: {
    limit: Compose([isStringInteger, (v) => parseInt(v)]),
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
  deleteRequest,
  popularListRequest,
}

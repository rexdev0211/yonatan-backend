const trava = require('trava');
const { ValidationError } = require('../errors');

module.exports = function(validator) {
  return (ctx, next) => {
    const result = validator(ctx);
    if (result instanceof Error) {
      const description = JSON.stringify(trava.ValidationError.extractData(result));
      throw new ValidationError({ description });
    }
    ctx.state.request = {
      body: result.request ? result.request.body : null,
      query: result.query,
      params: result.params
    }
    return next();
  };
};

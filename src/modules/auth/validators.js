const trava = require('trava');
const { Optional } = trava;
const { isFilledString, isBoolean } = require('../../utils/schemaValidators');

const loginRequest = trava({
  request: {
    body: {
      email: isFilledString,
      password: isFilledString
    }
  }
});

const sendConfirmationCodeRequest = trava({
  request: {
    body: {
      email: Optional(isFilledString),
      isCreate: isBoolean,
      mainPhoneNumber: Optional(isFilledString)
    }
  }
});

const checkConfirmationCodeRequest = trava({
  request: {
    body: {
      email: isFilledString,
      code: isFilledString,
    }
  }
})

const sendResetPasswordRequest = trava({
  request: {
    body: {
      email: isFilledString,
    }
  }
});

const resetPasswordRequest = trava({
  request: {
    body: {
      password: isFilledString,
      token: isFilledString
    }
  }
});

const accessTokenRequest = trava({
  request: {
    body: {
      path: isFilledString,
      code: isFilledString,
      clientId: isFilledString,
      redirectURI: isFilledString,
    }
  }
});

const registerRequest = trava({
    request: {
      body: {
        email: isFilledString,
        password: isFilledString,
      }
    }
  });
  
module.exports = {
  loginRequest,
  sendResetPasswordRequest,
  resetPasswordRequest,
  sendConfirmationCodeRequest,
  checkConfirmationCodeRequest,
  accessTokenRequest,
  registerRequest,
}

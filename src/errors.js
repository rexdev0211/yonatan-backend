class ValidationError extends Error {
  constructor(data) {
    super(data.description);
    this.code = data.code || 'VALIDATION_ERROR';
    this.status = 400;
  }
}

class LogicError extends Error {
  constructor(data) {
    super(data.description || data);
    this.code = data.code || 'LOGIC_ERROR';
    this.status = 400;
  }
}

class NotAuthorizedError extends Error {
  constructor(data) {
    super(data.description);
    this.code = data.code || 'NOT_AUTHORIZED';
    this.status = 401;
  }
}

class PaymentError extends Error {
  constructor(data) {
    super(data.description);
    this.code = data.code || 'PAYMENT_ERROR';
    this.status = 402;
  }
}

class ForbiddenError extends Error {
  constructor(data) {
    super(data.description);
    this.code = data.code || 'FORBIDDEN';
    this.status = 403;
  }
}

class ConflictError extends Error {
  constructor(data) {
    super(data?.description);
    this.code = data?.code || 'CONFLICT';
    this.status = 409;
  }
}

class InstagramClientError extends Error {
  constructor(data) {
    super(data?.description ?? 'Instagram access error');
    this.code = data?.code || 'INTERNAL_SERVER_ERROR';
    this.status = 500;
  }
}

class StripeError extends Error {
  constructor(data) {
    super(data?.description ?? 'Stripe Error')
    this.code = data?.code || 'STRIPE_ERROR';
    this.status = 500;
  }
}

class AzureMediaServicesError extends Error {
  constructor(data) {
    super(data?.description ?? 'Media Services Error')
    this.code = data?.code || 'AZURE_MEDIA_ERROR';
    this.status = 500;
  }
}

class ServiceUnavailable extends Error {
  constructor(data) {
    super(data.description);
    this.code = data.code || 'SERVICE_UNAVAILABLE';
    this.status = 503;
  }
}

// todo: add fabric like (code = 'LogicError', message = '') => new LogicError(message, code);
module.exports = {
  ValidationError,
  NotAuthorizedError,
  LogicError,
  PaymentError,
  ForbiddenError,
  ConflictError,
  InstagramClientError,
  StripeError,
  AzureMediaServicesError,
  ServiceUnavailable,
}

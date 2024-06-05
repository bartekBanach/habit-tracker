import CustomError from './CustomError';

class BadRequestError extends CustomError {
  errorCode = 400;
  errorType = 'BAD_REQUEST_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default BadRequestError;

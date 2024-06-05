import CustomError from './CustomError';

class NotFoundError extends CustomError {
  errorCode = 404;
  errorType = 'NOT_FOUND_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundError;

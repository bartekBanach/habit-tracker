import CustomError from './CustomError';

class AuthorizationError extends CustomError {
  errorCode = 403;
  errorType = 'AUTHORIZATION_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default AuthorizationError;

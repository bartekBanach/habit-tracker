import CustomError from './CustomError';
class AuthenticationError extends CustomError {
  errorCode = 401;
  errorType = 'AUTHENTICATION_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default AuthenticationError;

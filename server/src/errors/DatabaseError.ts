import CustomError from './CustomError';

class DatabaseError extends CustomError {
  errorCode = 500;
  errorType = 'INTERNAL_SERVER_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default DatabaseError;

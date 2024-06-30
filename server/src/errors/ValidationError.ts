import CustomError from './CustomError';

class ValidationError extends CustomError {
  errorCode = 400;
  errorType = 'VALIDATION_ERROR';

  constructor(
    message: string,
    private property: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors(): { message: string; property?: string | undefined }[] {
    return [{ message: this.message, property: this.property }];
  }
}

export default ValidationError;

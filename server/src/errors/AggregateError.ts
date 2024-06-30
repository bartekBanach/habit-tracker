import CustomError from './CustomError';

class AggregateError extends CustomError {
  errorCode = 400;
  errorType = 'AGGREGATE_ERROR';
  private errors: CustomError[];

  constructor(errors: CustomError[]) {
    super('Multiple errors occurred.');
    this.errors = errors;
    Object.setPrototypeOf(this, AggregateError.prototype);
  }

  serializeErrors() {
    return this.errors.flatMap((error) => error.serializeErrors());
  }
}

export default AggregateError;

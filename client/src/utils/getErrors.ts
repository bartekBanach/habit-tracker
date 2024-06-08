const getErrors = (error: unknown): BackendError[] => {
  let errors: BackendError[] = [];

  if (error instanceof Error) {
    errors.push({ message: error.message });
  } else if (error && typeof error === 'object' && 'data' in error) {
    errors = (error as ErrorResponse).data.errors;
    return errors;
  } else if (typeof error === 'string') {
    errors.push({ message: error });
  } else {
    errors.push({ message: 'Unknown error' });
  }
  return errors;
};

export default getErrors;

const captureErrorMessage = (error: any, defaultMessage: string) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error && error.message) {
    return error.message;
  }
  return defaultMessage;
};

export default captureErrorMessage;

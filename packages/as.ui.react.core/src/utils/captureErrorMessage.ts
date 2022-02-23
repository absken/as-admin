const captureErrorMessage = (error: any, defaultMessage: string) =>
  typeof error === 'string' ? error : error && error.message ? error.message : defaultMessage;

export default captureErrorMessage;

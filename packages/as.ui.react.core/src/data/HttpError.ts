class HttpError extends Error {
  constructor(
    public readonly message: string,
    public readonly status?: number,
    public readonly body?: any
  ) {
    super(message);

    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = this.constructor.name;
    this.status = status;
    this.body = body;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }

    this.stack = new Error().stack;
  }
}

export default HttpError;

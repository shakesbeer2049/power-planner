class AppError extends Error {
  status;
  isOperational;
  statusCode;

  constructor(message, statusCode) {
    super(message);

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

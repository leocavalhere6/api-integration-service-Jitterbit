/**
 * Custom application error class.
 * Used to throw controlled errors with HTTP status codes.
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;

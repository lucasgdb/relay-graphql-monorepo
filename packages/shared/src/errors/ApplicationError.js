export default class ApplicationError extends Error {
  constructor(message, code = 'UNDEFINED_ERROR_CODE', errorParams = null) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.errorParams = errorParams;

    Error.captureStackTrace(this, this.constructor);
  }
}

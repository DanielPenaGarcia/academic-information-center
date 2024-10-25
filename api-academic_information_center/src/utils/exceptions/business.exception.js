export class BusinessException extends Error {
  constructor(message, error) {
    super(message);
    this.error = error;
    this.name = 'BusinessException';
    this.statusCode = 400;
  }
}
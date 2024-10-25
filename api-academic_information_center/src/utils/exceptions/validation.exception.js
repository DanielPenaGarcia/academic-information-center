export class ValidationException extends Error {
  constructor(message, error) {
    super(message);
    this.error = error;
    this.name = 'ValidationException';
  }
}
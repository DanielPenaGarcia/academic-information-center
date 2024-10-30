export class ForbiddenException extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenException";
    this.statusCode = 403;
  }
}
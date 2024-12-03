import { HttpException } from "./http.exception.js";

export class UnauthorizedException extends HttpException {
  constructor() {
    super(401, "Unauthorized");
  }
}
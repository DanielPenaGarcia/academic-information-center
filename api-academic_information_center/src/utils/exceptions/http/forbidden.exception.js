import { HttpException } from "./http.exception.js";

export class ForbiddenException extends HttpException {
    constructor(message) {
        super(403, message);
        this.name = "ForbiddenException";
    }
}
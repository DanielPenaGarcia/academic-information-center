import { HttpException } from "./http.exception.js";

export class BadRequestException extends HttpException {
    constructor(message) {
        super(400, message);
        this.name = "BadRequestException";
    }
}
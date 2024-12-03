import { HttpException } from "./http.exception.js";

export class NotFoundException extends HttpException {
    constructor(message) {
        super(404, message);
        this.name = "NotFoundException";
    }
}
export class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorized';
        this.statusCode = 401;
    }
}
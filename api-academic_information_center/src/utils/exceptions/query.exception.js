export class QueryException extends Error {
    constructor(message) {
        super(message);
        this.name = 'QueryException';
    }
}
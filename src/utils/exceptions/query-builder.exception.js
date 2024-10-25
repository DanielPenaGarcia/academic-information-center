export class QueryBuilderException extends Error {
    constructor(message) {
        super(message);
        this.name = 'QueryBuilderException';
    }
}
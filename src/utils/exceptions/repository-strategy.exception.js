export class RepositoryStrategyException extends Error {
    constructor(message) {
        super(message);
        this.name = 'RepositoryStrategyException';
    }
}
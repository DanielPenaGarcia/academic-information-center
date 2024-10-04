export class RepositoryException extends Error {
    constructor(message) {
        super(message);
        this.name = 'RepositoryException';
    }
}
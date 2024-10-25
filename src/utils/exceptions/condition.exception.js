export class ConditionException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConditionException';
    }
}
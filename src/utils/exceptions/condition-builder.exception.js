export class ConditionBuilderException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConditionBuilderException';
    }
}
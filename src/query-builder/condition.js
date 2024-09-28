export class Condition {
    constructor(field, conditionOperator, value) {
        this.field = field;
        this.operator = conditionOperator;
        this.value = value;
    }

    get toString() {
        let value = this.value;
        if (typeof value === 'string') {
            value = `'${value}'`;
        }
        return `${this.field} ${this.operator} ${value}`;
    }
}

export const ConditionOperator = Object.freeze({
    EQUAL: '=',
    NOT_EQUAL: '!=',
    GREATER_THAN: '>',
    LESS_THAN: '<',
    GREATER_THAN_OR_EQUAL: '>=',
    LESS_THAN_OR_EQUAL: '<=',
    LIKE: 'LIKE',
    NOT_LIKE: 'NOT LIKE',
    IN: 'IN',
    NOT_IN: 'NOT IN',
    BETWEEN: 'BETWEEN',
    NOT_BETWEEN: 'NOT BETWEEN',
    IS_NULL: 'IS NULL',
    IS_NOT_NULL: 'IS NOT NULL'
})
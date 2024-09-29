import { Condition } from "../../query-builder/condition.js";

export function conditionsStringParser(conditions, where = true) {
    let conditionsString = where? 'WHERE' : '';
    if (conditions.length === 0) {
        return '';
    }
    conditions.forEach(element => {
        if (typeof element === 'string') {
            conditionsString += ` ${element} `;
        }
        if (element instanceof Array) {
            conditionsString += ` (${conditionsStringParser(element, false)}) `;
        }
        if (element instanceof Condition) {
            conditionsString += ` ${element.toString()} `;
        }
    });
    console.log(conditions);
    return conditionsString;
}
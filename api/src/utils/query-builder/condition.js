import { ConditionException } from "../exceptions/condition.exception.js";

export class Condition {
  constructor(field) {
    this.field = field;
  }

  toString() {
    throw new ConditionException("Must be implemented by subclass");
  }
}

export class EqualCondition extends Condition {
  constructor(field, value) {
    super(field);
    this.value = value;
  }

  toString() {
    this.value =
      typeof this.value === "string" ? `'${this.value}'` : this.value;
    return `${this.field} = ${this.value}`;
  }
}

export class NotEqualCondition extends Condition {
  constructor(field, value) {
    super(field);
    this.value = value;
  }

  toString() {
    this.value =
      typeof this.value === "string" ? `'${this.value}'` : this.value;
    return `${this.field} != ${this.value}`;
  }
}

export class GreaterThanCondition extends Condition {
  constructor(field, value) {
    super(field);
    if (value === undefined || value === null) {
      throw new ConditionException("Value must be defined");
    }
    if (typeof value !== "number") {
      throw new ConditionException("Value must be a number");
    }
    this.value = value;
  }

  toString() {
    return `${this.field} > ${this.value}`;
  }
}

export class LessThanCondition extends Condition {
  constructor(field, value) {
    super(field);
    if (value === undefined || value === null) {
      throw new ConditionException("Value must be defined");
    }
    if (typeof value !== "number") {
      throw new ConditionException("Value must be a number");
    }
    this.value = value;
  }

  toString() {
    return `${this.field} < ${this.value}`;
  }
}

export class GreaterThanOrEqualCondition extends Condition {
  constructor(field, value) {
    super(field);
    if (value === undefined || value === null) {
      throw new ConditionException("Value must be defined");
    }
    if (typeof value !== "number") {
      throw new ConditionException("Value must be a number");
    }
    this.value = value;
  }

  toString() {
    return `${this.field} >= ${this.value}`;
  }
}

export class LessThanOrEqualCondition extends Condition {
  constructor(field, value) {
    super(field);
    if (value === undefined || value === null) {
      throw new ConditionException("Value must be defined");
    }
    if (typeof value !== "number") {
      throw new ConditionException("Value must be a number");
    }
    this.value = value;
  }

  toString() {
    return `${this.field} <= ${this.value}`;
  }
}

export class LikeCondition extends Condition {
  constructor(field, value) {
    super(field);
    this.value = value;
  }

  toString() {
    return `${this.field} LIKE '${this.value}'`;
  }
}

export class NotLikeCondition extends Condition {
  constructor(field, value) {
    super(field);
    this.value = value;
  }

  toString() {
    return `${this.field} NOT LIKE '${this.value}'`;
  }
}

export class InCondition extends Condition {
  constructor(field, values) {
    super(field);
    this.values = values;
  }

  toString() {
    const formattedValues = this.values.map((value) =>
      typeof value === "string" ? `'${value}'` : value
    );
    return `${this.field} IN (${formattedValues.join(", ")})`;
  }
}

export class NotInCondition extends Condition {
  constructor(field, values) {
    super(field);
    this.values = values;
  }

  toString() {
    const formattedValues = this.values.map((value) =>
      typeof value === "string" ? `'${value}'` : value
    );
    return `${this.field} NOT IN (${formattedValues.join(", ")})`;
  }
}

export class BetweenCondition extends Condition {
  constructor(field, start, end) {
    super(field);
    this.start = start;
    this.end = end;
  }

  toString() {
    return `${this.field} BETWEEN ${this.start} AND ${this.end}`;
  }
}

export class NotBetweenCondition extends Condition {
  constructor(field, start, end) {
    super(field);
    this.start = start;
    this.end = end;
  }

  toString() {
    return `${this.field} NOT BETWEEN ${this.start} AND ${this.end}`;
  }
}

export class IsNullCondition extends Condition {
  constructor(field) {
    super(field);
  }

  toString() {
    return `${this.field} IS NULL`;
  }
}

export class IsNotNullCondition extends Condition {
  constructor(field) {
    super(field);
  }

  toString() {
    return `${this.field} IS NOT NULL`;
  }
}

export const ConditionOperator = Object.freeze({
  EQUAL: "=",
  NOT_EQUAL: "!=",
  GREATER_THAN: ">",
  LESS_THAN: "<",
  GREATER_THAN_OR_EQUAL: ">=",
  LESS_THAN_OR_EQUAL: "<=",
  LIKE: "LIKE",
  NOT_LIKE: "NOT LIKE",
  IN: "IN",
  NOT_IN: "NOT IN",
  BETWEEN: "BETWEEN",
  NOT_BETWEEN: "NOT BETWEEN",
  IS_NULL: "IS NULL",
  IS_NOT_NULL: "IS NOT NULL",
});

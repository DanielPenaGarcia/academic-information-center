import { conditionsStringParser } from "../utils/query-strings/conditions-string.js";
import { BetweenCondition, EqualCondition, GreaterThanCondition, GreaterThanOrEqualCondition, InCondition, IsNotNullCondition, IsNullCondition, LessThanCondition, LessThanOrEqualCondition, LikeCondition, NotBetweenCondition, NotEqualCondition, NotInCondition, NotLikeCondition } from "./condition.js";

export const where = function () {
  let conditions = [];
  return {
    and: function (condition) {
      conditions.push("AND");
      if (condition) {
        conditions.push(condition);
      }
      return this;
    },
    or: function (condition) {
      conditions.push("OR");
      if (condition) {
        conditions.push(condition);
      }
      return this;
    },
    equal: function (field, value) {
      conditions.push(new EqualCondition(field, value));
      return this;
    },
    notEqual: function (field, value) {
      conditions.push(new NotEqualCondition(field, value));
      return this;
    },
    greaterThan: function (field, value) {
      conditions.push(new GreaterThanCondition(field, value));
      return this;
    },
    lessThan: function (field, value) {
      conditions.push(new LessThanCondition(field, value));
      return this;
    },
    greaterThanOrEqual: function (field, value) {
      conditions.push(new GreaterThanOrEqualCondition(field, value));
      return this;
    },
    lessThanOrEqual: function (field, value) {
      conditions.push(new LessThanOrEqualCondition(field, value));
      return this;
    },
    like: function (field, value) {
      conditions.push(new LikeCondition(field, value));
      return this;
    },
    notLike: function (field, value) {
      conditions.push(new NotLikeCondition(field, value));
      return this;
    },
    in: function (field, values) {
      conditions.push(new InCondition(field, values));
      return this;
    },
    notIn: function (field, values) {
      conditions.push(new NotInCondition(field, values));
      return this;
    },
    between: function (field, start, end) {
      conditions.push(new BetweenCondition(field, start, end));
      return this;
    },
    notBetween: function (field, start, end) {
      conditions.push(new NotBetweenCondition(field, start, end));
      return this;
    },
    isNull: function (field) {
      conditions.push(new IsNullCondition(field));
      return this;
    },
    isNotNull: function (field) {
      conditions.push(new IsNotNullCondition(field));
      return this;
    },
    build: function () {
      return conditions;
    },
  };
};

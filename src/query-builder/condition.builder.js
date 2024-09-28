import { ConditionBuilderException } from "../utils/exceptions/condition-builder.exception.js";
import { Condition, ConditionOperator } from "./condition.js";

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
      conditions.push(new Condition(field, ConditionOperator.EQUAL, value));
      return this;
    },
    notEqual: function (field, value) {
      conditions.push(new Condition(field, ConditionOperator.NOT_EQUAL, value));
      return this;
    },
    greaterThan: function (field, value) {
      conditions.push(
        new Condition(field, ConditionOperator.GREATER_THAN, value)
      );
      return this;
    },
    lessThan: function (field, value) {
      conditions.push(new Condition(field, ConditionOperator.LESS_THAN, value));
      return this;
    },
    greaterThanOrEqual: function (field, value) {
      conditions.push(
        new Condition(field, ConditionOperator.GREATER_THAN_OR_EQUAL, value)
      );
      return this;
    },
    lessThanOrEqual: function (field, value) {
      conditions.push(
        new Condition(field, ConditionOperator.LESS_THAN_OR_EQUAL, value)
      );
      return this;
    },
    like: function (field, value) {
      conditions.push(new Condition(field, ConditionOperator.LIKE, value));
      return this;
    },
    notLike: function (field, value) {
      conditions.push(new Condition(field, ConditionOperator.NOT_LIKE, value));
      return this;
    },
    in: function (field, value) {
      conditions.push(new Condition(field, ConditionOperator.IN, value));
      return this;
    },
    notIn: function (field, value) {
      conditions.push(new Condition(field, ConditionOperator.NOT_IN, value));
      return this;
    },
    between: function (field, value) {
      conditions.push(new Condition(field, ConditionOperator.BETWEEN, value));
      return this;
    },
    notBetween: function (field, value) {
      conditions.push(
        new Condition(field, ConditionOperator.NOT_BETWEEN, value)
      );
      return this;
    },
    isNull: function (field) {
      conditions.push(new Condition(field, ConditionOperator.IS_NULL, null));
      return this;
    },
    isNotNull: function (field) {
      conditions.push(
        new Condition(field, ConditionOperator.IS_NOT_NULL, field)
      );
      return this;
    },
    build: function () {
      return conditions;
    },
  };
};

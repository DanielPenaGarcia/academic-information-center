import { BaseEntity } from "./base.entity.js";

export class Subject extends BaseEntity {
    name;
    hoursPerWeek;
    createdAt;
    updatedAt;
}
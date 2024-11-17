import { EntitySchema } from "typeorm";
import { ClassReview } from "../entities/class-review.entity.js";

export const ClassReviewSchema = new EntitySchema({
  name: "ClassReview",
  tableName: "class_reviews",
  target: ClassReview,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    comment: {
      type: "text",
      nullable: true,
    },
    createdAt: {
      name: "created_at",
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      name: "updated_at",
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    klass: {
        target: "Klass",
        type: "many-to-one",
        joinColumn: {
            name: "klass_id",
        },
        cascade: true,
    },
    student: {
        target: "Student",
        type: "many-to-one",
        joinColumn: {
            name: "student_id",
        },
        cascade: true,
    },
  }
});

import { Review } from "./review.entity.js";

export class ClassReview extends Review {
  constructor({
    id = null,
    comment,
    classRef,
    student,
    createdAt = null,
    updatedAt = null,
  }) {
    super({ id, comment, classRef, createdAt, updatedAt });
    this.student = student;
  }
}

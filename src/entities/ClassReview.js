import { Review } from "./Review.js";

export class ClassReview extends Review {
  constructor(comment, createdAt = null, updatedAt = null) {
    super(comment, createdAt, updatedAt);
  }
}

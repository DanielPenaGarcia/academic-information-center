export class Review {
  constructor(comment, createdAt = null, updatedAt = null) {
    this.comment = comment;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

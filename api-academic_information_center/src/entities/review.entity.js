export class Review {
  constructor({
    id = null,
    comment,
    classRef,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.comment = comment;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.classRef = classRef;
  }
}

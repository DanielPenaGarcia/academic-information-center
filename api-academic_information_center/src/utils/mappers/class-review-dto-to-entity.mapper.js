import { ClassReview } from "../../entities/class-review.entity.js";

export function classReviewDtoToEntityMapper(classReviewDTO) {
  const id = classReviewDTO.id ? classReviewDTO.id : null;
  const comment = classReviewDTO.comment ? classReviewDTO.comment : null;
  const classRef = classReviewDTO.class_ref ? classReviewDTO.class_ref : null;
  const createdAt = classReviewDTO.created_at
    ? classReviewDTO.created_at
    : null;
  const updatedAt = classReviewDTO.updated_at
    ? classReviewDTO.updated_at
    : null;
  const student = classReviewDTO.student ? classReviewDTO.student : null;

  const classReviewEntity = new ClassReview({
    id,
    comment,
    classRef,
    student,
    createdAt,
    updatedAt,
  });

  return classReviewEntity;
}

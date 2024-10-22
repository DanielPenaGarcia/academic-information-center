import { StudentReview } from "../../entities/student-review.entity.js";

export function studentReviewDtoToEntityMapper(studentReviewDTO) {
  const id = studentReviewDTO.id ? studentReviewDTO.id : null;
  const comment = studentReviewDTO.comment ? studentReviewDTO.comment : null;
  const classRef = studentReviewDTO.class_ref
    ? studentReviewDTO.class_ref
    : null;
  const createdAt = studentReviewDTO.created_at
    ? studentReviewDTO.created_at
    : null;
  const updatedAt = studentReviewDTO.updated_at
    ? studentReviewDTO.updated_at
    : null;
  const student = studentReviewDTO.student ? studentReviewDTO.student : null;

  const studentReviewEntity = new StudentReview({
    id,
    comment,
    classRef,
    student,
    createdAt,
    updatedAt,
  });

  return studentReviewEntity;
}

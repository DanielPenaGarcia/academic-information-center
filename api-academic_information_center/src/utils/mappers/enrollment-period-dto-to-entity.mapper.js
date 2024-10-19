import { EnrollmentPeriod } from "../../entities/enrollment-period.entity.js";

export function enrollmentPeriodDtoToEntityMapper(enrollmentPeriodDTO) {
  const id = enrollmentPeriodDTO.id ? enrollmentPeriodDTO.id : null;
  const startDate = enrollmentPeriodDTO.start_date
    ? enrollmentPeriodDTO.start_date
    : null;
  const endDate = enrollmentPeriodDTO.end_date
    ? enrollmentPeriodDTO.end_date
    : null;
  const createdAt = enrollmentPeriodDTO.created_at
    ? enrollmentPeriodDTO.created_at
    : null;
  const updatedAt = enrollmentPeriodDTO.updated_at
    ? enrollmentPeriodDTO.updated_at
    : null;

  const enrollmentPeriodEntity = new EnrollmentPeriod({
    id,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  });

  return enrollmentPeriodEntity;
}

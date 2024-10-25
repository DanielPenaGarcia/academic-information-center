import { EnrollmentAppointment } from "../../entities/enrollment-appointment.entity.js";

export function enrollmentAppointmentDtoToEntityMapper(
  enrollmentAppointmentDTO
) {
  const id = enrollmentAppointmentDTO.id ? enrollmentAppointmentDTO.id : null;
  const student = enrollmentAppointmentDTO.student
    ? enrollmentAppointmentDTO.student
    : null;
  const enrollmentPeriod = enrollmentAppointmentDTO.enrollment_period
    ? enrollmentAppointmentDTO.enrollment_period
    : null;
  const startDateTime = enrollmentAppointmentDTO.start_date_time
    ? enrollmentAppointmentDTO.start_date_time
    : null;
  const createdAt = enrollmentAppointmentDTO.created_at
    ? enrollmentAppointmentDTO.created_at
    : null;
  const updatedAt = enrollmentAppointmentDTO.updated_at
    ? enrollmentAppointmentDTO.updated_at
    : null;

  const enrollmentAppointmentEntity = new EnrollmentAppointment({
    id,
    student,
    enrollmentPeriod,
    startDateTime,
    createdAt,
    updatedAt,
  });

  return enrollmentAppointmentEntity;
}

import { Student } from "../../entities/student.entity.js";

export function studentDtoToEntityMapper(studentDTO) {
  const names = studentDTO.names ? studentDTO.names : null;
  const fatherLastName = studentDTO.father_last_name
    ? studentDTO.father_last_name
    : null;
  const motherLastName = studentDTO.mother_last_name
    ? studentDTO.mother_last_name
    : null;
  const curp = studentDTO.curp ? studentDTO.curp : null;
  const createdAt = studentDTO.created_at ? studentDTO.created_at : null;
  const updatedAt = studentDTO.updated_at ? studentDTO.updated_at : null;
  const id = studentDTO.id ? studentDTO.id : null;
  const email = studentDTO.email ? studentDTO.email : null;
  const password = studentDTO.password ? studentDTO.password : null;
  const academicId = studentDTO.academic_id ? studentDTO.academic_id : null;
  const photo = studentDTO.photo ? studentDTO.photo : null;
  const enrollmentAppointments = studentDTO.enrollment_appointments
    ? studentDTO.enrollment_appointments
    : [];
  const student = new Student({
    names,
    fatherLastName,
    motherLastName,
    curp,
    createdAt,
    updatedAt,
    id,
    email,
    password,
    academicId,
    photo,
    enrollmentAppointments,
  });
  return student;
}

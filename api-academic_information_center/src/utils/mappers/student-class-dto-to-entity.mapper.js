import { StudentClass } from "../../entities/student-class.entity.js";

export function studentClassDtoToEntityMapper(studentClassDTO) {
  const id = studentClassDTO.id ? studentClassDTO.id : null;
  const student = studentClassDTO.student ? studentClassDTO.student : null;
  const classRef = studentClassDTO.class_ref ? studentClassDTO.class_ref : null;
  const grade = studentClassDTO.grade ? studentClassDTO.grade : null;
  const status = studentClassDTO.status ? studentClassDTO.status : null;
  const name = studentClassDTO.name ? studentClassDTO.name : null;
  const createdAt = studentClassDTO.created_at
    ? studentClassDTO.created_at
    : null;
  const updatedAt = studentClassDTO.updated_at
    ? studentClassDTO.updated_at
    : null;
  const studentClass = new StudentClass({
    id: id,
    name: name,
    createdAt: createdAt,
    updatedAt: updatedAt,
    classRef: classRef,
    student: student,
    grade: grade,
    status: status,
  });
  return studentClass;
}

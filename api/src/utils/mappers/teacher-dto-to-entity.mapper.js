import { Teacher } from "../../entities/teacher.entity.js";

export function teacherDtoToEntityMapper(teacherDTO) {
  const names = teacherDTO.names ? teacherDTO.names : null;
  const fatherLastName = teacherDTO.father_last_name
    ? teacherDTO.father_last_name
    : null;
  const motherLastName = teacherDTO.mother_last_name
    ? teacherDTO.mother_last_name
    : null;
  const curp = teacherDTO.curp ? teacherDTO.curp : null;
  const createdAt = teacherDTO.created_at ? teacherDTO.created_at : null;
  const updatedAt = teacherDTO.updated_at ? teacherDTO.updated_at : null;
  const id = teacherDTO.id ? teacherDTO.id : null;
  const email = teacherDTO.email ? teacherDTO.email : null;
  const password = teacherDTO.password ? teacherDTO.password : null;
  const academicId = teacherDTO.academic_id ? teacherDTO.academic_id : null;
  const photo = teacherDTO.photo ? teacherDTO.photo : null;
  const classes = teacherDTO.classes ? teacherDTO.classes : [];
  const subjects = teacherDTO.subjects ? teacherDTO.subjects : [];

  const teacher = new Teacher({
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
    classes,
    subjects,
  });
  return teacher;
}

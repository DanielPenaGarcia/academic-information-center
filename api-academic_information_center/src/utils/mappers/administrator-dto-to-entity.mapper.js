import { Administrator } from "../../entities/administrator.entity.js";

export function administratorDtoToEntityMapper(administratorDTO) {
  const names = administratorDTO.names ? administratorDTO.names : null;
  const fatherLastName = administratorDTO.father_last_name
    ? administratorDTO.father_last_name
    : null;
  const motherLastName = administratorDTO.mother_last_name
    ? administratorDTO.mother_last_name
    : null;
  const curp = administratorDTO.curp ? administratorDTO.curp : null;
  const createdAt = administratorDTO.created_at
    ? administratorDTO.created_at
    : null;
  const updatedAt = administratorDTO.updated_at
    ? administratorDTO.updated_at
    : null;
  const id = administratorDTO.id ? administratorDTO.id : null;
  const email = administratorDTO.email ? administratorDTO.email : null;
  const password = administratorDTO.password ? administratorDTO.password : null;
  const academicId = administratorDTO.academic_id
    ? administratorDTO.academic_id
    : null;
  const photo = administratorDTO.photo ? administratorDTO.photo : null;

  const administrator = new Administrator({
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
  });

  return administrator;
}

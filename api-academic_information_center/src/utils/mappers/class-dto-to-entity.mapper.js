import { Class } from "../../entities/class.entity.js";

export function classDtoToEntityMapper(classDTO) {
  const id = classDTO.id ? classDTO.id : null;
  const startTime = classDTO.start_time ? classDTO.start_time : null;
  const duration = classDTO.duration ? classDTO.duration : null;
  const days = classDTO.days ? classDTO.days : null;
  const student = classDTO.student ? classDTO.student : null;
  const subject = classDTO.subject ? classDTO.subject : null;
  const createdAt = classDTO.created_at ? classDTO.created_at : null;
  const updatedAt = classDTO.updated_at ? classDTO.updated_at : null;

  const classEntity = new Class({
    id,
    startTime,
    duration,
    days,
    student,
    subject,
    createdAt,
    updatedAt,
  });

  return classEntity;
}

import { Subject } from "../../entities/subject.entity.js";

export function subjectDtoToEntityMapper(subjectDTO) {
  const id = subjectDTO.id ? subjectDTO.id : null;
  const name = subjectDTO.name ? subjectDTO.name : null;
  const hoursPerWeek = subjectDTO.hours_per_week
    ? subjectDTO.hours_per_week
    : null;
  const semester = subjectDTO.semester ? subjectDTO.semester : null;
  const courseMap = subjectDTO.course_map ? subjectDTO.course_map : null;
  const createdAt = subjectDTO.created_at ? subjectDTO.created_at : null;
  const updatedAt = subjectDTO.updated_at ? subjectDTO.updated_at : null;

  const subjectEntity = new Subject({
    id,
    name,
    hoursPerWeek,
    semester,
    courseMap,
    createdAt,
    updatedAt,
  });

  return subjectEntity;
}

import { CourseMap } from "../../entities/course-map.entity.js";

export function courseMapDtoToEntityMapper(courseMapDTO) {
  const id = courseMapDTO.id ? courseMapDTO.id : null;
  const semesters = courseMapDTO.semesters ? courseMapDTO.semesters : [];
  const year = courseMapDTO.year ? courseMapDTO.year : null;
  const createdAt = courseMapDTO.created_at ? courseMapDTO.created_at : null;
  const updatedAt = courseMapDTO.updated_at ? courseMapDTO.updated_at : null;

  const courseMapEntity = new CourseMap({
    id,
    semesters,
    year,
    createdAt,
    updatedAt,
  });

  return courseMapEntity;
}

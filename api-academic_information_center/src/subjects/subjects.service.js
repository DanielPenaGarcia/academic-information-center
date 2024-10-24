import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";
import { BusinessException } from "../utils/exceptions/business.exception.js";
import { subjectDtoToEntityMapper } from "../utils/mappers/subject-dto-to-entity.mapper.js";

export class SubjectsService {
  constructor() {
    this.subjectsRepository = new Repository(RepositoryTable.SUBJECT);
    this.courseMapRepository = new Repository(RepositoryTable.COURSEMAP);
  }

  async createSubject({ name, hoursPerWeek, semester, courseMapId }) {
    const fields = ["name", "hours_per_week", "semester", "course_map_id"];
    const values = [[name, hoursPerWeek, semester, courseMapId]];
    const subjectsRepeated = await this.subjectsRepository.find({
      conditions: where()
        .equal("name", name)
        .and()
        .equal("course_map_id", courseMapId)
        .build(),
    });
    if (subjectsRepeated.length > 0) {
        throw new BusinessException(`Subject ${name} already exists in this course map`);
    }
    const result = await this.subjectsRepository.create({
      fields: fields,
      values: values,
    });
    if (result.affectedRows === 0) {
      throw new Error("Error creating subject");
    }
    const subjectDTO = await this.subjectsRepository.findOneById(result.insertId);
    const subject = subjectDtoToEntityMapper(subjectDTO);
    return subject;
  }
}

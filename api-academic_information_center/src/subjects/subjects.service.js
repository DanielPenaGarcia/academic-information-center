import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";
import { BusinessException } from "../utils/exceptions/business.exception.js";
import { subjectDtoToEntityMapper } from "../utils/mappers/subject-dto-to-entity.mapper.js";

export class SubjectsService {
  constructor() {
    this.subjectsRepository = new Repository(RepositoryTable.SUBJECT);
    this.courseMapRepository = new Repository(RepositoryTable.COURSEMAP);
  }

  async createSubject({ name, hoursPerWeek, semester, courseMap}) {
    const fields = ["name", "hours_per_week", "semester", "course_map_id"];
    const values = [[name, hoursPerWeek, semester, courseMap]];
    const subjectsRepeated = await this.subjectsRepository.find({
      conditions: where()
        .equal("name", name)
        .and()
        .equal("course_map_id", courseMap)
        .build(),
    });
    if (subjectsRepeated.length > 0) {
        throw new BusinessException(`Subject ${name} already exists in this course map`);
    }
    if(hoursPerWeek <1){
      throw new BusinessException(`Hours per week must be greater than 0`);
    }
    if(semester <1){
      throw new BusinessException(`Semester must be greater than 0`);
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

  async updateSubject({id, name, hoursPerWeek, semester, courseMap }) {
    const values = [];
    const condition = where().equal("id", id).build();
    const subjectDTO = await this.subjectsRepository.findOneById(id);
    if (!subjectDTO) {
      throw new BusinessException("Subject not found");
    }
    const subjectsRepeated = await this.subjectsRepository.find({
      conditions: where()
        .equal("name", name)
        .and()
        .equal("course_map_id", courseMap)
        .build(),
    });
    if (subjectsRepeated.length > 0) {
        throw new BusinessException(`Subject ${name} already exists in this course map`);
    }
    if(hoursPerWeek <1){
      throw new BusinessException(`Hours per week must be greater than 0`);
    }
    if(semester <1){
      throw new BusinessException(`Semester must be greater than 0`);
    }
    if(name){
      values.push({
        column:"name",
        value:name
      });
    }
    if(hoursPerWeek){
      values.push({
        column:"hours_per_week",
        value:hoursPerWeek
      });
    }
    if(semester){
      values.push({
        column:"semester",
        value:semester
      });
    }
    if(courseMap){
      values.push({
        column:"course_map_id",
        value:courseMap
      });
    }
   
    const result = await this.subjectsRepository.update({
      setValues: values,
      conditions: condition,
    });

    return result;
  }
}

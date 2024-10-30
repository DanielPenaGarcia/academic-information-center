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
      throw new BusinessException(`Las horas por semana deben ser mayores a 0`);
    }
    if(semester <1){
      throw new BusinessException(`La cantidad de semestres debe ser mayor a 0`);
    }
    const result = await this.subjectsRepository.create({
      fields: fields,
      values: values,
    });
    if (result.affectedRows === 0) {
      throw new BusinessException("Error creando la materia");
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
      throw new BusinessException("No se encontró la materia con el id proporcionado");
    }
    const subjectsRepeated = await this.subjectsRepository.find({
      conditions: where()
        .equal("name", name)
        .and()
        .equal("course_map_id", courseMap)
        .build(),
    });
    if (subjectsRepeated.length > 0) {
        throw new BusinessException(`La materia ${name} ya existe en este mapa curricular`);
    }
    if(hoursPerWeek <1){
      throw new BusinessException(`Las horas por semana deben ser mayores a 0`);
    }
    if(semester <1){
      throw new BusinessException(`La cantidad de semestres debe ser mayor a 0`);
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

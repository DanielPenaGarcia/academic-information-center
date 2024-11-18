import { Like } from "typeorm";
import { dataSource } from "../config/orm.config.js";
import { SubjectSchema } from "../schemas/subject.schema.js";

export class SubjectsService {

  constructor() {
    this.subjectsRepository = dataSource.getRepository(SubjectSchema);
  }

  async findSubjectsByCourseMapYear(year, query) {
    const subjects = await this.subjectsRepository.find({
      where: {
        courseMap: {
          year: year
        },
        semester: query.semester? query.semester : undefined,
        name: Like(`%${query.name.toLowerCase()}%`),
        hoursPerWeek: query.hours? query.hours : undefined
      },
      select: {
        id: true,
        name: true,
        hoursPerWeek: true,
        semester: true,
        createdAt: true,
        updatedAt: true,
        courseMap: {
          id: true,
          year: true,
          createdAt: true,
          updatedAt: true
        }
      },
      relations: {
        courseMap: true
      }
    });
    return subjects;
  }
}

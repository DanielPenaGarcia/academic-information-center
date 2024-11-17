import { dataSource } from "../config/orm.config.js";
import { SubjectSchema } from "../schemas/subject.schema.js";

export class SubjectsService {

  constructor() {
    this.subjectsRepository = dataSource.getRepository(SubjectSchema);
  }

  async findSubjectsByCourseMapYear(query) {
    const subjects = await this.subjectsRepository.find({
      where: {
        courseMap: {
          year: query.courseMapYear
        },
        semester: query.semester
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

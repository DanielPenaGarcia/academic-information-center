import { Like } from "typeorm";
import { dataSource } from "../config/orm.config.js";
import { SubjectSchema } from "../schemas/subject.schema.js";

export class SubjectsService {
  constructor() {
    this.subjectsRepository = dataSource.getRepository(SubjectSchema);
  }

  async findSubjectsByCourseMapYear({ year, query, pageable }) {
    const subjects = await this.subjectsRepository.findAndCount({
      where: {
        courseMap: {
          year: year,
        },
        semester: query.semester ? query.semester : undefined,
        name: Like(`%${query.name}%`),
        hoursPerWeek: query.hours ? query.hours : undefined,
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
          updatedAt: true,
        },
      },
      relations: {
        courseMap: true,
      },
      take: pageable.limit,
      skip: pageable.offset,
    });
    return {
      subjects: subjects[0],
      totalElements: subjects[1],
      totalPages: Math.ceil(subjects[1] / pageable.limit),
      currentPage: pageable.page,
    };
  }

  async findSubjectById(subjectId) {
    const subject = await this.subjectsRepository.findOneBy({
      id: subjectId,
    });
    return subject;
  }
}

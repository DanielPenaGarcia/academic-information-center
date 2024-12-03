import { Like } from "typeorm";
import { dataSource } from "../config/orm.config.js";
import { SubjectSchema } from "../schemas/subject.schema.js";
import { CourseMapSchema } from "../schemas/course-map.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";

export class SubjectsService {
  constructor() {
    this.subjectsRepository = dataSource.getRepository(SubjectSchema);
    this.courseMapRepository = dataSource.getRepository(CourseMapSchema);
  }

  async createSubject({ name, hoursPerWeek, semester, courseMapId }) {
    const courseMap = await this.courseMapRepository.findOne({
      where: {
        id: courseMapId,
      },
      select: {
        id: true,
        semesters: true,
      }
    });
    if (!courseMap) {
      throw new BadRequestException(`Course map with id ${courseMapId} not found`);
    }
    if (semester > courseMap.semesters) {
      throw new BadRequestException(`Semester must be less than or equal to ${courseMap.semesters}`);
    }
    if (hoursPerWeek <= 0) {
      throw new BadRequestException("Hours per week must be greater than 0");
    }
    const subject = this.subjectsRepository.create({
      name: name,
      hoursPerWeek: hoursPerWeek,
      semester: semester,
      courseMap: courseMap,
    });
    await this.subjectsRepository.save(subject);
    return subject;
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

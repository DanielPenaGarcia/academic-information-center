import { dataSource } from "../config/orm.config.js";
import { CourseMapSchema } from "../schemas/course-map.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { NotFoundException } from "../utils/exceptions/http/not-found.exception.js";

export class CourseMapsService {
  constructor() {
    this.courseMapsRepository = dataSource.getRepository(CourseMapSchema);
  }

  async createCourseMap({ semesters, year }) {
    const courseMaps = await this.courseMapsRepository.findOne({
      where: {
        year: year,
      },
    });

    if (courseMaps) {
      throw new BadRequestException(
        `Course map with year ${year} already exists`
      );
    }

    if (semesters <= 0) {
      throw new BadRequestException("Semesters must be greater than 0");
    }

    if (year <= 0) {
      throw new BadRequestException("Year must be greater than 0");
    }

    const courseMap = this.courseMapsRepository.create({
      semesters: semesters,
      year: year,
    });

    await this.courseMapsRepository.save(courseMap);
    return courseMap;
  }

  async findAllCourseMaps({ pageable }) {
    const [courseMaps, total] = await this.courseMapsRepository.findAndCount({
      select: {
        id: true,
        semesters: true,
        year: true,
        createdAt: true,
        updatedAt: true,
      },
      take: pageable.limit,
      skip: pageable.offset,
    });
    return {
      courseMaps: courseMaps,
      totalElements: total,
      totalPages: Math.ceil(total / pageable.limit),
      currentPage: pageable.page,
    };
  }

  async findCourseMapById({ id }) {
    const courseMap = await this.courseMapsRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        semesters: true,
        year: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!courseMap) {
      throw new NotFoundException(`Course map with id ${id} not found`);
    }
    return courseMap;
  }
}

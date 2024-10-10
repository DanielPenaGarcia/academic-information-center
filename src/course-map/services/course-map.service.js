import { where } from "../../query-builder/condition.builder.js";
import { BusinessException } from "../../utils/exceptions/business.exception.js";
import {
  Repository,
  RepositoryTable,
} from "../../utils/repository/repository.js";

export class CourseMapService {
  constructor() {
    this.courseMapRepository = new Repository(RepositoryTable.COURSEMAP);
  }

  async createCourseMap(courseMapDTO) {
    const fields = ["semesters", "year"];
    if (!courseMapDTO.semesters) {
      throw new BusinessException("Semesters is required");
    }
    if (!courseMapDTO.year) {
      throw new BusinessException("Year is required");
    }
    const values = [[courseMapDTO.semesters, courseMapDTO.year]];
    const findCourseMap = await this.findCourseMapByYear(courseMapDTO.year);
    if (findCourseMap) {
      throw new BusinessException("Course map already exists");
    }
    const result = await this.courseMapRepository.create({ fields, values });
    if (result.affectedRows === 0) {
      throw new Error("Course map not created");
    }
    const courseMapSaved = await this.courseMapRepository.findOneById(
      result.insertId
    );
    return courseMapSaved;
  }

  async findCourseMapByYear(year) {
    try {
      if (!year) {
        throw new BusinessException("Year is required");
      }
      const condition = where().equal("year", year).build();
      const courseMap = await this.courseMapRepository.findOne({
        conditions: condition,
      });
      return courseMap;
    } catch (error) {
      throw new Error(
        `Error al buscar el mapa curricular por año: ${error.message}`
      );
    }
  }
}

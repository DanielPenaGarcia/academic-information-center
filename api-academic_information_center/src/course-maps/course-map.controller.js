import { CourseMapsService } from "./course-maps.service.js";

export class CourseMapController {
  constructor() {
    this.courseMapsService = new CourseMapsService();
  }

  async createCourseMap(req, res, next) {
    try {
      const { semesters, year } = req.body;
      const result = await this.courseMapsService.createCourseMap({
        semesters,
        year,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllCourseMaps(req, res, next) {
    try {
        const { pageable } = req.query;
        const result = await this.courseMapsService.findAllCourseMaps({
            pageable,
        });
        res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  getCourseMapByYear(req, res, next) {
    try {
      const { year } = req.params;
      const result = this.courseMapsService.getCourseMapByYear(year);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

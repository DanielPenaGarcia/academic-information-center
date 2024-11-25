import { Pageable } from "../utils/classes/pageable.class.js";
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
      const query = req.query;
      if (!query.page) {
        query.page = 1;
      }
      if (!query.size) {
        query.size = 10;
      }
      const pageable = new Pageable(query.page, query.size);
        const courseMaps = await this.courseMapsService.findAllCourseMaps({
            pageable,
        });
        res.status(200).json(courseMaps);
    } catch (error) {
      next(error);
    }
  }

  getCourseMapByYear(req, res, next) {
    try {
      const { year } = req.params;
      const result = this.courseMapsService.findCourseMapByYear(year);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

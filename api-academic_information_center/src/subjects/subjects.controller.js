import { Pageable } from "../utils/classes/pageable.class.js";
import { SubjectsService } from "./subjects.service.js";

export class SubjectsController {
  constructor() {
    this.subjectService = new SubjectsService();
  }

  async postCreateSubject(req, res, next) {
    try {
      const { name, hoursPerWeek, semester, courseMapId } = req.body;
      const subject = await this.subjectService.createSubject({
        name,
        hoursPerWeek,
        semester,
        courseMapId,
      });
      res.status(201).json(subject);
    } catch (error) {
      next(error);
    }
  }

  async getFindSubjects(req, res, next) {
    try {
      const year = req.params.year;
      const query = req.query;
      const pageable = new Pageable(query.page, query.size);
      const subjects = await this.subjectService.findSubjectsByCourseMapYear({
        year,
        query,
        pageable,
      });
      res.status(200).json(subjects);
    } catch (error) {
      next(error);
    }
  }

  async getFindSubjectById(req, res, next) {
    try {
      const subjectId = req.params.subjectId;
      const subject = await this.subjectService.findSubjectById(subjectId);
      res.status(200).json(subject);
    } catch (error) {
      next(error);
    }
  }
}

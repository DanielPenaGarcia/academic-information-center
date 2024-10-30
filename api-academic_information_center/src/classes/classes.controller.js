import { UserRole } from "../entities/enums/roles.enum.js";
import { ForbiddenException } from "../utils/exceptions/forbidden.exception.js";
import { ClassesService } from "./classes.service.js";

export class ClassesController {
  constructor() {
    this.classesService = new ClassesService();
  }

  async create(req, res, next) {
    try {
      const { startTime, description, duration, days, subjectId, teacherId } =
        req.body;
      const classEntity = await this.classesService.createClass({
        startTime,
        description,
        duration,
        days,
        subjectId,
        teacherId,
      });
      res.status(201).json(classEntity);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const { id, startTime, description, duration, days, subjectId } =
        req.body;
      const classUpdated = await this.classesService.updateClass({
        id,
        startTime,
        description,
        duration,
        days,
        subjectId,
      });
      res.status(201).json(classUpdated);
    } catch (error) {
      next(error);
    }
  }

  async findScheduleByStudentAcademicId(req, res, next) {
    try {
      this.#validateFindScheduleByStudentByAcademicId(req, res);
      const { academicId } = req.params;
      const classes = await this.classesService.findScheduleByStudentAcademicId(
        {
          academicId,
        }
      );
      res.json(classes);
    } catch (error) {
      next(error);
    }
  }

  #validateFindScheduleByStudentByAcademicId(req, res) {
    const userRequesting = req.user;
    if (userRequesting.role !== UserRole.STUDENT || userRequesting.role !== UserRole.ADMINISTRATOR) {
      throw new ForbiddenException("No tienes permisos para realizar esta acción");
    }
    if (userRequesting.role === UserRole.STUDENT && userRequesting.academicId !== req.params.academicId) {
      throw new ForbiddenException("No tienes permisos para realizar esta acción");
    }
  }

  async findScheduleByTeacherAcademicId(req, res, next) {
    try {
      this.#validateFindScheduleByTeacherAcademicIdRequest(req, res);
      const { academicId } = req.params;
      const classes = await this.classesService.findScheduleByTeacherAcademicId(
        {
          academicId,
        }
      );
      res.json(classes);
    } catch (error) {
      next(error);
    }
  }

  async assignTeacher(req, res) {
    try {
      this.#validateAssignTeacher(req);
      const { academicId, classId } = req.body;
      const result = await this.classesService.assignTeacher({
        academicId,
        classId,
      });
      if (!result) {
        return res.status(500).send(`Error assigning the teacher`);
      }
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  #validateAssignTeacher(req) {
    const userRequesting = req.user;
    if (userRequesting.role != UserRole.ADMINISTRATOR) {
      throw new ForbiddenException("No tienes permisos para realizar esta acción");
    }
  }

  #validateFindScheduleByTeacherAcademicIdRequest(req, res) {
    const userRequesting = req.user;
    if (userRequesting.role !== UserRole.TEACHER || userRequesting.role !== UserRole.ADMINISTRATOR) {
      throw new ForbiddenException("No tienes permisos para realizar esta acción");
    }
    if (userRequesting.role === UserRole.TEACHER && userRequesting.academicId !== req.params.academicId) {
      throw new ForbiddenException("No tienes permisos para realizar esta acción");
    }
  }
}

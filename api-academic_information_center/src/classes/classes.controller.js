import { ClassSchema } from "../schemas/class.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { ClassesService } from "./classes.service.js";

export class ClassesController {
  constructor() {
    this.classesService = new ClassesService();
  }

  async postCreateClass(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestException("El cuerpo de la petición está vacío");
      }
      const { startTime, duration, days, subjectId } = req.body;
      if (!startTime || !duration || !days || !subjectId) {
        throw new BadRequestException(
          "Faltan campos obligatorios en el cuerpo de la petición"
        );
      }
      const klass = await this.classesService.createClass({
        startTime,
        duration,
        days,
        subjectId,
      });
      res.status(201).json(klass);
    } catch (error) {
      next(error);
    }
  }

  async AssignTeacherToClass(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestException("El cuerpo de la petición está vacío");
      }
      const { classId, teacherId } = req.body;
      if (!classId || !teacherId) {
        throw new BadRequestException(
          "Faltan campos obligatorios en el cuerpo de la petición"
        );
      }
      await this.classesService.assignTeacherToClass({ classId, teacherId });
      res.status(201).json({ message: "Profesor asignado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async enrollStudent(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestException("El cuerpo de la petición está vacío");
      }
      const { studentId, classId } = req.body;
      if (!studentId || !classId) {
        throw new BadRequestException(
          "Faltan campos obligatorios en el cuerpo de la petición"
        );
      }
      const studentClass = await this.classesService.enrollStudent({
        studentId,
        classId,
      });
      res.status(201).json(studentClass);
    } catch (error) {
      next(error);
    }
  }

  async getAvailableClassesByStudent(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestException("El cuerpo de la petición está vacío");
      }
      const { studentId } = req.body;
      if (!studentId) {
        throw new BadRequestException(
          "Faltan campos obligatorios en el cuerpo de la petición"
        );
      }
      const classes = await this.classesService.getAvailableClassesByStudent({
        studentId,
      });
      res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  }
}

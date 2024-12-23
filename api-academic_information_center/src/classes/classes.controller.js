import { ClassSchema } from "../schemas/class.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { ClassesService } from "./classes.service.js";

export class ClassesController {
  constructor() {
    this.classesService = new ClassesService();
  }

  async getClassById(req, res, next) {
    try {
      const { id } = req.params;
      const klass = await this.classesService.findClassById({ id });
      res.status(200).json(klass);
    } catch (error) {
      next(error);
    }
  }

  async postCreateClass(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestException("El cuerpo de la petición está vacío");
      }
      let { startTime, duration, days, subjectId, classroom } = req.body;
      if (!startTime || !duration || !days || !subjectId) {
        throw new BadRequestException(
          "Faltan campos obligatorios en el cuerpo de la petición"
        );
      }
      classroom ? (classroom = classroom) : (classroom = "Aula por asignar");
      const klass = await this.classesService.createClass({
        startTime,
        duration,
        days,
        subjectId,
        classroom,
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

  async getEnrolledClasses(req, res, next) {
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
      const classes = await this.classesService.getEnrolledClasses({
        studentId,
      });
      res.status(200).json(classes);
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

  async dropClass(req, res, next) {
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
      const klass = await this.classesService.dropClass({
        studentId,
        classId,
      });
      res.status(200).json(klass);
    } catch (error) {
      next(error);
    }
  }

  async getClassesByTeacher(req, res, next){
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
          throw new BadRequestException("El cuerpo de la petición está vacío");
        }
        const { teacherId } = req.body;
        if (!teacherId) {
          throw new BadRequestException(
            "Faltan campos obligatorios en el cuerpo de la petición"
          );
        }
        const classes = await this.classesService.getClassesByTeacher({
          teacherId,
        });
        res.status(200).json(classes);
      } catch (error) {
        next(error);
      }
  }

  async getClassesWithoutTeacher(req, res, next){
    try {
        const classes = await this.classesService.getClassesWithoutTeacher();
        res.status(200).json(classes);
      } catch (error) {
        next(error);
      }
  }

  async getClassesByTeacherEspeciality(req, res, next) {
    try {
      const { teacherId } = req.query; 
  
      if (!teacherId) {
        throw new BadRequestException("Faltan campos obligatorios en la URL");
      }
  
      const classes = await this.classesService.getClassesByTeacherEspeciality({
        teacherId,
      });
      
      res.status(200).json(classes);
      
    } catch (error) {
      next(error);
    }

  }
  
  
    
  async patchClassDescription(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestException("El cuerpo de la petición está vacío");
      }
      const { description } = req.body;
      const { id } = req.params;
      const { academicId, role } = req.user;

      if (!id || !description) {
        throw new BadRequestException(
          "Faltan campos obligatorios en el cuerpo de la petición"
        );
      }
      const klass = await this.classesService.updateDescription({
        classId: id,
        description: description,
        currentRole: role,
        user: {
          academicId: academicId,
        },
      });
      res.status(200).json(klass);

    } catch (error) {
      next(error);
    }
  }
}


import { role } from "../entities/enums/role.enum.js";
import { Pageable } from "../utils/classes/pageable.class.js";
import { ForbiddenException } from "../utils/exceptions/http/forbidden.exception.js";
import { StudentsClassesService } from "./students-classes.service.js";

export class StudentsClassesController {
  constructor() {
    this.studentsClassesService = new StudentsClassesService();
  }

  async studentSchedule(req, res, next) {
    try {
      const { academicId } = req.params;
      const user = req.user;
      if (user.academicId !== academicId && user.role !== role.ADMIN) {
        throw new ForbiddenException(
          "No tienes permisos para ver este horario"
        );
      }
      const studentClasses = await this.studentsClassesService.studentSchedule({
        academicId,
      });
      res.status(200).json(studentClasses);
    } catch (error) {
      next(error);
    }
  }

  async printStudentSchedule(req, res, next) {
    try {
      const { academicId } = req.params;
      const user = req.user;
      if (user.academicId !== academicId && user.role !== role.ADMIN) {
        throw new ForbiddenException(
          "No tienes permisos para ver este horario"
        );
      }
      const studentClasses =
        await this.studentsClassesService.printStudentSchedule({
          academicId,
          params: req.query,
        });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'inline; filename="schedule.pdf"');
      res.status(200).send(studentClasses);
    } catch (error) {
      next(error);
    }
  }

  async getStudentClassesByStudentId(req, res, next) {
    try {
      const { page, count, subject } = req.query;
      const pageable = new Pageable(page, count);
      const academicId = req.params.studentId;
      const studentClasses =
        await this.studentsClassesService.getStudentClassesByStudentId(
          { academicId },
          pageable,
          { className: subject }
        );
      res.status(200).json(studentClasses);
    } catch (error) {
      next(error);
    }
  }

  async dropClass(req, res, next) {
    try {
      const { academicId, studentClassId } = req.params;
      const classDroped = await this.studentsClassesService.dropClass({
        academicId,
        studentClassId,
      });
      return res.status(200).json(classDroped);
    } catch (error) {
      next(error);
    }
  }

  async getStudentClassesToReview(req, res,next) {
    try {
      //const {page,count} = req.query;
      // const pageable =  new Pageable(page,+count);
      const { academicId} = req.params;
      const classDroped = await this.studentsClassesService.getStudentClassesToReview({academicId});
      return res.status(200).json(classDroped);
    } catch (error) {
      next(error);
    }
  }
  
  async getStudentsInClass(req, res, next) {
    try {
      const { classId } = req.params;
      let { page, size } = req.query;
      if (!page || page < 0) {
        page = 1;
      }
      if (!size || size < 1) {
        size = 10;
      }
      const pageable = new Pageable(page, size);
      const students = await this.studentsClassesService.studentsInClass({
        classId: classId,
        pageable: pageable
      });
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  async getStudentInClass(req, res, next) {
    try {
      const { classId, academicId } = req.params;
      const student = await this.studentsClassesService.findStudentInClass({
        classId,
        academicId,
      });
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }

  async patchGradeStudent(req, res, next) {
    try {
      const { academicId, classId } = req.params;
      const { grade, feedback } = req.body;
      const updatedStudent = await this.studentsClassesService.gradeStudent({
        academicId,
        classId,
        grade,
        feedback,
      });
      res.status(200).json(updatedStudent);
    } catch (error) {
      next(error);
    }
  }
}

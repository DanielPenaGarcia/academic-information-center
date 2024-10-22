import { UserRole } from "../entities/enums/roles.enum.js";
import { ClassesService } from "./classes.service.js";

export class ClassesController {
  constructor() {
    this.classesService = new ClassesService();
  }

  async findScheduleByStudentAcademicId(req, res) {
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
      if (error.message === "Forbidden") {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  #validateFindScheduleByStudentByAcademicId(req, res) {
    const userRequesting = req.user;
    if (userRequesting.role !== UserRole.STUDENT) {
      throw new Error("Forbidden");
    }
    if (userRequesting.academicId !== req.params.academicId) {
      throw new Error("Forbidden");
    }
    if (userRequesting.role === UserRole.TEACHER) {
      throw new Error("Forbidden");
    }
  }

  async findScheduleByTeacherAcademicId(req, res) {
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
      if (error.message === "Forbidden") {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  #validateFindScheduleByTeacherAcademicIdRequest(req, res) {
    const userRequesting = req.user;
    if (userRequesting.role !== UserRole.TEACHER) {
      throw new Error("Forbidden");
    }
    if (userRequesting.academicId !== req.params.academicId) {
      throw new Error("Forbidden");
    }
    if (userRequesting.role === UserRole.STUDENT) {
      throw new Error("Forbidden");
    }
  }
}

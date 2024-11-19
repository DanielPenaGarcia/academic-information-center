import { StudentsService } from "./students.service.js";

export class StudentController {
  constructor() {
    this.studentService = new StudentsService();
  }

  async createStudent(req, res,next) {
    try {
      //this.#validateAdmin(req);
      const { names, fatherLastName, motherLastName, curp, photo } = req.body;
      const student = await this.studentService.createStudent({
        names,
        fatherLastName,
        motherLastName,
        curp,
        photo,
      });
      res.status(200).json({student});
    } catch (error) {
      next(error);
    }
  }

  async updateStudent(req, res, next) {
    try {
      this.#validateUpdateStudentByStudentOrAdmin(req);
      const { academicId, names, fatherLastName, motherLastName, curp } =
        req.body;
      const result = await this.studentService.updateStudentProfile({
        academicId,
        names,
        fatherLastName,
        motherLastName,
        curp,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  #validateUpdateStudentByStudentOrAdmin(req) {
    const userRequesting = req.user;
    if (userRequesting.role === UserRole.STUDENT) {
      if (userRequesting.academicId !== req.body.academicId) {
        throw new Error("Forbidden");
      }
    } else if (userRequesting.role !== UserRole.ADMINISTRATOR) {
      throw new Error("Forbidden");
    }
  }

  #validateAdmin(req) {
    const userRequesting = req.user;
    if (userRequesting.role !== UserRole.ADMINISTRATOR) {
      throw new Error("Forbidden");
    }
  }
}

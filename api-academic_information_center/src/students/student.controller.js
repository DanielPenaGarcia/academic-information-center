import { Pageable } from "../utils/classes/pageable.class.js";
import { StudentsService } from "./students.service.js";

export class StudentController {
  constructor() {
    this.studentService = new StudentsService();
  }

  async getAllStudents(req,res,next){
    try{
      const {page,count,academicId} = req.query;
      const pageable = new Pageable(page,count);
      const students = await this.studentService.getAllStudents(pageable,{academicId});
      res.status(200).json(students);
    }catch(error){
      next(error);
    }
  }

  async getStudentInfoByAcademicId(req,res,next){
    try{
      const {academicId} = req.user;
      const student = await this.studentService.getStudentInfoByAcademicId({academicId})
      res.status(200).json({student});
    } catch (error) {
      next(error);
    }
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
      //this.#validateUpdateStudentByStudentOrAdmin(req);
      const { names, fatherLastName, motherLastName, curp,password,photo } = req.body;
      const {academicId} = req.user;
      const student = await this.studentService.updateStudentProfile({
        academicId,
        names,
        fatherLastName,
        motherLastName,
        password,
        curp,
      });
      res.status(200).json({student});
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

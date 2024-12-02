import { Pageable } from "../utils/classes/pageable.class.js";
import { StudentsClassesService } from "./students-classes.service.js";

export class StudentsClassesController {
  constructor() {
    this.studentsClassesService = new StudentsClassesService();
  }

  async getStudentClassesByStudentId(req,res,next){
    try{
      const {page,count,subject} = req.query;
      const pageable = new Pageable(page,count);
      const academicId = req.params.studentId;
      const studentClasses = await  this.studentsClassesService.getStudentClassesByStudentId({academicId},pageable,{className:subject});
      res.status(200).json(studentClasses);
    }catch(error){
      next(error);
    }
  }

  async dropClass(req, res,next) {
    try {
      const { academicId,studentClassId } = req.params;
      const classDroped = await this.studentsClassesService.dropClass({academicId,studentClassId});
      return res.status(200).json(classDroped);
    } catch (error) {
      next(error);
    }
  }

  async getStudentClassesToReview(req, res,next) {
    try {
      const {page,count} = req.query;
      const pageable = new Pageable(page,+count);
      const { academicId} = req.params;
      const classDroped = await this.studentsClassesService.getStudentClassesToReview({academicId},pageable);
      return res.status(200).json(classDroped);
    } catch (error) {
      next(error);
    }
  }

//   #validateDropStudentClassByStudentOrAdmin(req){
//     const userRequesting = req.user;
//     if(userRequesting.role === UserRole.STUDENT){
//         if(userRequesting.academicId !== req.body.academicId){
//           throw new Error("Forbidden");
//         }
//     }else if(userRequesting.role !== UserRole.ADMINISTRATOR){
//       throw new Error("Forbidden");
//     }
//   }
//   async enrollClass(req, res) {
//     try {
//       this.#validateUser(req, res);
//       const { academicId, classId } = req.body;
//       const enrolledClass = await this.studentsClassesService.enrollClass({
//         academicId,
//         classId,
//       });
//       if (!enrolledClass) {
//         return res
//           .status(500)
//           .send(
//             `Error enrolling the class, try paying the classes that you owe us first`
//           );
//       }
//       //TODO: Eliminar datos que regresen nulos
//       return res.status(200).send(enrolledClass.classRef);
//     } catch (error) {
//       if (error.message === "Forbidden") {
//         return res.status(403).json({ error: "Forbidden" });
//       }
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async gradeStudent(req, res) {
//     try {
//       this.#validateTeacher(req);
//       const { academicId, classId, grade } = req.body;
//       const result = await this.studentsClassesService.gradeStudent({
//         academicId,
//         classId,
//         grade,
//       });
//       if (!result) {
//         return res.status(500).send(`Error grading the student`);
//       }
//       return res.status(200).send(result);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   #validateUser(req) {
//     const userRequesting = req.user;
//     if (
//       userRequesting.role !== UserRole.STUDENT &&
//       userRequesting.role !== UserRole.ADMINISTRATOR
//     ) {
//       throw new Error("Forbidden");
//     }
//     if (userRequesting.role === UserRole.STUDENT) {
//       if (userRequesting.academicId !== req.body.academicId) {
//         throw new Error("Forbidden");
//       }
//     }
//   }

//   #validateTeacher(req) {
//     const userRequesting = req.user;
//     if (userRequesting.role != UserRole.TEACHER) {
//       throw new Error("Forbidden");
//     }
//   }
}
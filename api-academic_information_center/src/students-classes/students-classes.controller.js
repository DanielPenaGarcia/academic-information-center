import { UserRole } from "../entities/enums/roles.enum.js";
import { StudentsClassesService } from "./students-classes.service.js";

export class StudentsClassesController{

    constructor(){
        this.studentsClassesService = new StudentsClassesService();
    }

    async dropClass(req,res){
        try{
            this.#validateUser(req,res);
        const {academic_id,classId} = req.body;

        const classDroped = await this.studentsClassesService.dropClass({academic_id,classId});

        if(!classDroped){
            return res.status(500).send(`Error droping class`);
        }

        return res.status(200).send(`Class Droped succesfully`);
    }catch(error){
        if (error.message === "Forbidden") {
            return res.status(403).json({ error: "Forbidden" });
          }
          res.status(500).json({ error: error.message });
        }
    }

    async enrollClass(req, res){
      try{
        this.#validateUser(req,res)
        const {academic_id,classId} = req.body;
        const droppedClass = await this.studentsClassesService.enrollClass({academic_id,classId});
        if(!droppedClass){
          return res.status(500).send(`Error enrolling the class, try paying the classes that you owe us first`);
        }
        return res.status(200).send(`Class enrolled succesfully`);
      }catch(error){
        if (error.message === "Forbidden") {
            return res.status(403).json({ error: "Forbidden" });
          }
          res.status(500).json({ error: error.message });
        }
    }

    async gradeStudent(req, res){
      try{
        this.#validateTeacher(req)
        const {studentId, classId, grade} = req.body;
        const result = await this.studentsClassesService.gradeStudent({studentId, classId, grade})
        if(!result){
          return res.status(500).send(`Error grading the student`);
        }
        return res.status(200).send(`student graded succesfully`);
      } catch(error){
        res.status(500).json({ error: error.message });
      }
    }

    #validateUser(req){
        const userRequesting = req.user;
        if(userRequesting.role !== UserRole.STUDENT){
          throw new Error("Forbidden");
        }
        if(userRequesting.role !== UserRole.ADMINISTRATOR){
          throw new Error("Forbidden");
        }
        if(userRequesting.role==UserRole.STUDENT){
          if (userRequesting.academicId !== req.params.academicId) {
            throw new Error("Forbidden");
          }
        }
      }

    #validateTeacher(req){
      const userRequesting=req.user
      if(userRequesting.role!=UserRole.TEACHER){
        throw new Error("Forbidden");
      }
    }

}
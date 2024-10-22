import { UserRole } from "../entities/enums/roles.enum.js";
import { StudentsService } from "./students.service.js";

export class StudentController{

    constructor(){
        this.studentService = new StudentsService();
    }

    async createStudent(req,res){
      try{
        this.#validateAdmin(req)
        const { names, fatherLastName, motherLastName, curp, photo }=req.params
        const result = await this.studentService.createStudent({ names, fatherLastName, motherLastName, curp, photo})
        res.status(200).json(result);
      } catch(error){
        if (error.message === "Forbidden") {
          return res.status(403).json({ error: "Forbidden" });
        }
        res.status(500).json({ error: error.message });      }
    }

    async updateStudent(req,res){
        try {
            this.#validateUser(req, res);
            const { academicId, names, fatherLastName, motherLastName, curp} = req.body;
            const result = await this.studentService.updateStudentProfile({academicId,names,fatherLastName,motherLastName,curp});
            res.status(200).json(result);
          } catch (error) {
            if (error.message === "Forbidden") {
              return res.status(403).json({ error: "Forbidden" });
            }
            res.status(500).json({ error: error.message });
          }
    }

    #validateUser(req, res) {
        const userRequesting = req.user;
        if (userRequesting.role !== UserRole.ADMINISTRATOR || userRequesting.role !== UserRole.STUDENT) {
          throw new Error("Forbidden");
        }
        if (userRequesting.academicId !== req.params.academicId) {
          throw new Error("Forbidden");
        }
      }

    #validateAdmin(req){
      const userRequesting = req.user;
        if (userRequesting.role !== UserRole.ADMINISTRATOR) {
          throw new Error("Forbidden");
        }
    }

}
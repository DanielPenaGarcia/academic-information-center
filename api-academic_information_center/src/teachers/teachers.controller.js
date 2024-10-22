import { UserRole } from "../entities/enums/roles.enum.js";
import { TeachersService } from "./teachers.service.js";

export class TeacherController{

    constructor(){
        this.teacherService = new TeachersService();
    }

    async updateTeacher(req,res){
        try {
            //this.#validateUser(req, res);
            const { academicId, names, fatherLastName, motherLastName, curp} = req.body;
            const result = await this.teacherService.updateTeacher({academicId,names,fatherLastName,motherLastName,curp});
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
        if (userRequesting.role !== UserRole.ADMINISTRATOR || userRequesting.role !== UserRole.TEACHER) {
          throw new Error("Forbidden");
        }
        if (userRequesting.academicId !== req.params.academicId) {
          throw new Error("Forbidden");
        }
      }

}
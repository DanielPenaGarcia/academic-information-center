import { UserRole } from "../entities/enums/roles.enum.js";
import { StudentClassService } from "./student-class.service.js";

export class StudentClassController{

    constructor(){
        this.studentClassService = new StudentClassService();
    }

    async dropClass(req,res){
        try{

            this.#validateDropClassUser(req,res);
        const {academic_id,classId} = req.body;

        const classDroped = await this.studentClassService.dropClass({academic_id,classId});

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

    #validateDropClassUser(req,res){
        const userRequesting = req.user;
        if(userRequesting.role !== UserRole.STUDENT && userRequesting.role !== UserRole.ADMINISTRATOR){
          throw new Error("Forbidden");
        }
        if (userRequesting.academicId !== req.params.academicId) {
          throw new Error("Forbidden");
        }
      }

}
import { UserRole } from "../entities/enums/roles.enum.js";
import { StudentsClassesService } from "./students-classes.service.js";

export class StudentsClassesController{

    constructor(){
        this.studentsClassesService = new StudentsClassesService();
    }

    async dropClass(req,res){
        try{

            this.#validateDropClassUser(req,res);
        const {academic_id,classId} = req.body;

        const classDroped = await this.studentsClassesService.dropClass({academic_id,classId});

        if(!classDroped){
            return res.status(500).json({message: `Error droping class`});
        }

        return res.status(200).json({message: `Class Droped succesfully`});
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
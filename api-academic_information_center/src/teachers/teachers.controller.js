import { UserRole } from "../entities/enums/roles.enum.js";
import { TeachersService } from "./teachers.service.js";

export class TeacherController{

    constructor(){
        this.teacherService = new TeachersService();
    }


    async createTeacher(req,res){
      try{
        this.#validateAdmin(req)
        const {names, fatherLastName, motherLastName, curp, photo} = req.body;
        const result = await this.teacherService.createTeacher({ names, fatherLastName, motherLastName, curp, photo })
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
}

    async updateTeacher(req,res){
        try {
            this.#validateUpdateTeacherByTeacherOrAdmin(req);
            const { academicId, names, fatherLastName, motherLastName, curp} = req.body;
            const result = await this.teacherService.updateTeacher({academicId,names,fatherLastName,motherLastName,curp});
            res.status(200).json(result);
          } catch (error) {
            next(error);
          }
    }

    #validateUpdateTeacherByTeacherOrAdmin(req){
      const userRequesting = req.user;
      if(userRequesting.role === UserRole.TEACHER){
          if(userRequesting.academicId !== req.body.academicId){
            throw new Error("Forbidden");
          }
      }else if(userRequesting.role !== UserRole.ADMINISTRATOR){
        throw new Error("Forbidden");
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

      #validateAdmin(req) {
        const userRequesting = req.user;
        if (userRequesting.role !== UserRole.ADMINISTRATOR) {
          throw new Error("Forbidden");
        }
      }
}
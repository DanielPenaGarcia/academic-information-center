import { TeachersService } from "./teachers.service.js";

export class TeacherController{

    constructor(){
        this.teacherService = new TeachersService();
    }


    async createTeacher(req,res,next){
      try{
        const {names, fatherLastName, motherLastName, curp, photo} = req.body;
        const teacher = await this.teacherService.createTeacher({ names, fatherLastName, motherLastName, curp, photo })
        res.status(200).json({teacher});
      } catch (error) {
        next(error);
      }
}


    async updateTeacher(req,res){
        try {
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
}
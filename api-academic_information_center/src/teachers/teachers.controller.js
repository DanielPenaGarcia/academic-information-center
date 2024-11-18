import { TeachersService } from "./teachers.service.js";

export class TeacherController{

    constructor(){
        this.teacherService = new TeachersService();
    }


    async getTeacherInfoByAcademicId(req,res,next){
      try{
        const {academicId} = req.user;
        const teacher = await this.teacherService.getTeacherInfoByAcademicId({academicId})
        res.status(200).json({teacher});
      } catch (error) {
        next(error);
      }
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


    async updateTeacher(req,res,next){
        try {
            const {names, fatherLastName, motherLastName, curp, password} = req.body;
            const {academicId} = req.user;
            const teacher = await this.teacherService.updateTeacher({academicId,names,fatherLastName,motherLastName,password,curp});
            res.status(200).json({teacher});
          } catch (error) {
            next(error);
          }
    }
}
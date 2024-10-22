import { TeacherSubjectsService } from "./teachers-subjects.service.js";

export class TeacherSubjectsController{
    constructor(){
        this.teacherSubjecstService = new TeacherSubjectsService();
    }

    async asignSubjectToTeacher(req,res){
        try {
            this.#validateUser(req, res);
            const { academicId,subjectId} = req.params;
            const result = await this.teacherSubjecstService.create({academicId,subjectId});
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
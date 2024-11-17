import {SubjectsService} from "./subjects.service.js";

export class SubjectsController{
    constructor(){
        this.subjectService = new SubjectsService();
    }

    async getFindSubjects(req, res, next){
        try {
            const query = req.query;
            const subjects = await this.subjectService.findSubjectsByCourseMapYear(query);
            res.status(200).json(subjects);
        } catch (error) {
            next(error);
        }
    }
}
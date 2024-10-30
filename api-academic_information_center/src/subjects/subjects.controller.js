import {SubjectsService} from "./subjects.service.js";

export class SubjectsController{

    constructor(){
        this.subjectService = new SubjectsService();
    }

    async createSubject(req,res){
      //TODO: Regresar al menos unos datos del course map
        try {
            const {name, hoursPerWeek, semester, courseMap} = req.body;
            const result = await this.subjectService.createSubject({name, hoursPerWeek, semester, courseMap});
            res.status(201).json(result);
          } catch (error) {
           next(error);
          }
    }

    async updateSubject(req,res){
        try {
            const {id, name, hoursPerWeek, semester, courseMap} = req.body;
            const result = await this.subjectService.updateSubject({id, name, hoursPerWeek, semester, courseMap});
            res.status(201).json(result);
          } catch (error) {
            next(error);
          }
    }
}
import {SubjectsService} from "./subjects.service.js";

export class SubjectsController{

    constructor(){
        this.subjectService = new SubjectsService();
    }

    async createSubject(req,res){
      //TODO: Regresar al menos unos datos del course map
        try {
            const {name, hoursPerWeek, semester, courseMapId} = req.body;
            const result = await this.subjectService.createSubject({name, hoursPerWeek, semester, courseMapId});
            res.status(201).json(result);
          } catch (error) {
            if (error.message === "Forbidden") {
              return res.status(403).json({ error: "Forbidden" });
            }
            res.status(500).json({ error: error.message });
          }
    }
}
import { StudentClassService } from "./student-class.service.js";

export class StudentClassController{

    constructor(){
        this.studentClassService = new StudentClassService();
    }

    async dropClass(req,res){
        try{
        const {academic_id,class_id} = req.body;

        const reviewClassCreated = await this.studentClassService.dropClass({academic_id,class_id});

        if(!reviewClassCreated){
            return res.status(401).send(`Error creating class review`);
        }

        return res.status(200).send(reviewClassCreated);
    }catch(err){
        return res.status(401).send(err);
    }
    }

}
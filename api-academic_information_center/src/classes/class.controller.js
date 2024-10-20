import { ClassService } from "./class.service.js";

export class ClassController{

    constructor(){
        this.classService = new ClassService();
    }

    async generateReviewClass(req,res){
        try{
        const {academic_id,class_id,comment} = req.body;

        const reviewClassCreated = await this.classService.generateClassReview({comment,academic_id,class_id});

        if(!reviewClassCreated){
            return res.status(401).send(`Error creating class review`);
        }

        return res.status(200).send(reviewClassCreated);
    }catch(err){
        return res.status(401).send(err);
    }
    }

}
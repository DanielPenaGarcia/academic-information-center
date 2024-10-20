import { StudentsService } from "./students.service";

export class StudentController{

    constructor(){
        this.studentService = new StudentsService();
    }

    async generateReviewClass(req,res){

        const {student_id,class_id,comment} = req.body;

        const reviewClassCreated = this.studentService.generateClassReview({comment,student_id,class_id});

        if(!reviewClassCreated){
            return res.status(401).send(`Error creating class review`);
        }

        return res.status(200).send(reviewClassCreated);
    }

}
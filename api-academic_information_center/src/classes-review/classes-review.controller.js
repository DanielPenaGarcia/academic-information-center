import { UserRole } from "../entities/enums/roles.enum.js";
import { ClassesReviewService } from "./classes-review.service.js";

export class ClassesReviewController {
  constructor() {
    this.classesReviewService = new ClassesReviewService();
  }

  
  async generateReviewClass(req,res){
    try{
    this.#validateGenerateReview(req);
    const {academicId,classId,comment} = req.body;

    const reviewClassCreated = await this.classesReviewService.generateClassReview({comment,academicId,classId});

    if(!reviewClassCreated){
        return res.status(500).send({error:`Error creating class review`});
    }

    return res.status(200).json(reviewClassCreated);
}catch(error){
  if (error.message === "Forbidden") {
    return res.status(403).json({ error: "Forbidden" });
  }
    return res.status(500).json({error:error.message});
}
}

#validateGenerateReview(req){
  const userRequesting = req.user;
  if(userRequesting.role !== UserRole.STUDENT){
    throw new Error("Forbidden");
  }
  if (userRequesting.academicId !== req.body.academicId) {
    throw new Error("Forbidden");
  }
}
}
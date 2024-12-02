import { ClassesReviewService } from "./classes-review.service.js";

export class ClassesReviewController {
  constructor() {
    this.classesReviewService = new ClassesReviewService();
  }

  
  async generateReviewClass(req,res,next){
    try{
    // this.#validateGenerateReview(req);
    const {academicId,classId,comment} = req.body;

    const reviewClassCreated = await this.classesReviewService.generateClassReview({comment,academicId,classId});
    
    return res.status(200).json(reviewClassCreated);
}catch(error){
  next(error);
}
}

// #validateGenerateReview(req){
//   const userRequesting = req.user;
//   if(userRequesting.role !== UserRole.STUDENT){
//     throw new Error("Forbidden");
//   }
//   if (userRequesting.academicId !== req.body.academicId) {
//     throw new Error("Forbidden");
//   }
// }
}
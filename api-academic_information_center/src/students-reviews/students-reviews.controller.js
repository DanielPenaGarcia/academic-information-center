import { UserRole } from "../entities/enums/roles.enum.js";
import { StudentsReviewsService } from "./students-reviews.service.js";

export class StudentsReviewController {
    constructor() {
      this.studentsReviewService = new StudentsReviewsService();
    }
  
    
    async generateStudentReview(req,res){
      try{
      this.#validateGenerateReview(req,res);
      const {comment,teacherAcademicId,studentAcademicId,classId} = req.body;
  
      const studentReviewCreated = await this.studentsReviewService.generateStudentReview({comment,teacherAcademicId,studentAcademicId,classId});
  
      if(!studentReviewCreated){
          return res.status(500).send(`Error creating student review`);
      }
  
      return res.status(200).json(studentReviewCreated);
  }catch(error){
    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Forbidden" });
    }
      return res.status(500).json({error:error.message});
  }
  }
  
  #validateGenerateReview(req,res){
    const userRequesting = req.user;
    if(userRequesting.role !== UserRole.TEACHER){
      throw new Error("Forbidden");
    }
    if (userRequesting.academicId !== req.params.academicId) {
      throw new Error("Forbidden");
    }
  }
  }
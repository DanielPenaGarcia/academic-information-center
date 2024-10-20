import { Repository, RepositoryTable } from "../utils/repository/repository";
import { classReviewDtoToEntityMapper } from "../utils/mappers/class-review-dto-to-entity.mapper.js";


export class ClassService{
    constructor(){
        this.repositoryStudent = new Repository(RepositoryTable.STUDENT);
        this.repositoryClass = new Repository(RepositoryTable.CLASS);
        this.repositoryStudentReview = new Repository(RepositoryTable.STUDENT_REVIEW);
    }

    
  async generateClassReview({commnet,student_id,student_id}){

    const fields = ["student_id", "comment", "class_id"];
    const values = [[student_id,commnet,student_id]];

    const studet = await this.repositoryStudent.findOneById(student_id);
    if(!studet){
      throw new Error(`Student with Id ${student_id} not found`);
    }

    const clase = await this.repositoryClass.findOneById(student_id);
    
    if(!clase){
      throw new Error(`Class with id ${student_id} not found`);
    }

    const result = this.repositoryStudentReview.create({
      fields : fields,
      values : values
    });

    if (result.affectedRows === 0) {
      throw new Error("Error creating class review");
    }

    const classReview = this.repositoryStudentReview.findOneById(result.insertId);
    const classReviewDTO = classReviewDtoToEntityMapper(classReview);
    if(classReview){
      throw new Error(`Error class review with id ${cla}`);
    }

    return classReviewDTO;
  }
}
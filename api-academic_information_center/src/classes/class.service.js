import { Repository, RepositoryTable } from "../utils/repository/repository.js";
import { classReviewDtoToEntityMapper } from "../utils/mappers/class-review-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";


export class ClassService{
    constructor(){
        this.repositoryStudent = new Repository(RepositoryTable.STUDENT);
        this.repositoryClass = new Repository(RepositoryTable.CLASS);
        this.repositoryClassReview = new Repository(RepositoryTable.CLASS_REVIEW);
    }

    
  async generateClassReview({comment,academic_id,class_id}){

    const condition = where().equal('academic_id',academic_id).build();

    const studet = await this.repositoryStudent.findOne({condition: condition});
    if(!studet){
      throw new Error(`Student with academic id ${academic_id} not found`);
    }

    const clase = await this.repositoryClass.findOneById(class_id);
    
    if(!clase){
      throw new Error(`Class with id ${class_id} not found`);
    }

    const fields = ["student_id", "comment", "class_id"];
    const values = [[studet.id,comment,class_id]];

    const result = await this.repositoryClassReview.create({
      fields : fields,
      values : values
    });

    if (result.affectedRows === 0) {
      throw new Error("Error creating class review");
    }

    const classReview = await this.repositoryClassReview.findOneById(result.insertId);
    const classReviewDTO = classReviewDtoToEntityMapper(classReview);
    classReviewDTO.classRef = clase;
    classReviewDTO.student = studet;
    return classReviewDTO;
  }
}
import {classReviewDtoToEntityMapper} from "../utils/mappers/class-review-dto-to-entity.mapper.js"
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class ClassesReviewService {
  constructor() {
    this.classesRepository = new Repository(RepositoryTable.CLASS);
    this.studentsRepository = new Repository(RepositoryTable.STUDENT);
    this.studentsClassesRepository = new Repository(RepositoryTable.STUDENTS_CLASSES);
    this.repositoryClassReview = new Repository(RepositoryTable.CLASS_REVIEW);


  }

  async generateClassReview({comment,academicId,classId}){

    const condition = where().equal('academic_id',academicId).build();

    const studet = await this.studentsRepository.findOne({condition: condition});
    if(!studet){
      throw new Error(`Student with academic id ${academicId} not found`);
    }

    const clase = await this.classesRepository.findOneById(classId);
    
    if(!clase){
      throw new Error(`Class with id ${classId} not found`);
    }

    const condition2 = where().equal('student_id',studet.id).and().equal("class_id",classId).build();
    const studentClass = await this.studentsClassesRepository.find({condition: condition2});

    if(!studentClass){
        throw new Error(`Student with academic id ${academicId} is or was not enrolled in the class`);
    }

    const fields = ["student_id", "comment", "class_id"];
    const values = [[studet.id,comment,classId]];

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
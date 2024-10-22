import { studentReviewDtoToEntityMapper } from "../utils/mappers/student-review-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class StudentsReviewsService{
    constructor(){
        this.studentsReviewsRespository = new Repository(RepositoryTable.STUDENT_REVIEW);
        this.classesRepository = new Repository(RepositoryTable.CLASS);
        this.studentsRepository = new Repository(RepositoryTable.STUDENT);
        this.studentsClassesRepository = new Repository(RepositoryTable.STUDENTS_CLASSES);
        this.teacherRepository = new Repository(RepositoryTable.TEACHER);
        this.teacherSubjectRepository = new Repository(RepositoryTable.TEACHERS_SUBJECTS);

    }

    async generateStudentReview({comment,teacherAcademicId,studentAcademicId,classId}){
    
    const condition = where().equal('academic_id',studentAcademicId).build();

    const studet = await this.studentsRepository.findOne({condition: condition});
    if(!studet){
      throw new Error(`Student with academic id ${studentAcademicId} not found`);
    }

    const condition2 = where().equal('academic_id',teacherAcademicId).build();

    const teacher = await this.teacherRepository.findOne({condition: condition2});
    if(!teacher){
      throw new Error(`Teacher with academic id ${teacherAcademicId} not found`);
    }

    const clase = await this.classesRepository.findOneById(classId);
    
    if(!clase){
      throw new Error(`Class with id ${classId} not found`);
    }

    const condition3 = where().equal('student_id',studet.id).and().equal("class_id",classId).build();
    const studentClass = await this.studentsClassesRepository.find({condition: condition3});

    if(!studentClass){
        throw new Error(`Student with academic id ${studentAcademicId} is or was not enrolled in the class`);
    }

    const condition4 = where().equal('teacher_id',teacher.id).and().equal("subject_id",clase.subject_id).build();
    const teacherSubject = await this.repositoryTeachersSubjects.find({condition: condition4});

    if(!teacherSubject){
        throw new Error(`Teacher with academic id ${teacherAcademicId} does not have assigned the subject class`);
    }

    const fields = ["student_id", "comment", "class_id"];
    const values = [[studet.id,comment,classId]];

    const result = await this.studentsReviewsRespository.create({
      fields : fields,
      values : values
    });

    if (result.affectedRows === 0) {
      throw new Error("Error creating student review");
    }

    const studentReview = await this.studentsReviewsRespository.findOneById(result.insertId);
    const studentReviewDTO = studentReviewDtoToEntityMapper(studentReview);
    studentReviewDTO.classRef = clase;
    studentReviewDTO.student = studet;
    return studentReviewDTO;
    }
}
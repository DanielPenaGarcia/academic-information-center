import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class TeacherSubjectsService{
    constructor(){
        this.teacherSubjectRepository = new Repository(RepositoryTable.TEACHERS_SUBJECTS);
        this.subjectRepository = new Repository(RepositoryTable.SUBJECT);
        this.teachersRepository = new Repository(RepositoryTable.TEACHER);
    }

    async create({academicId,subjectId}){

        const condition = where().equal('academic_id',academicId).build();

        const teacher = await this.teachersRepository.findOne({condition: condition});
        if(!teacher){
          throw new Error(`Teacher with academic id ${academicId} not found`);
        }

        const subject = await this.subjectRepository.findOneById(subjectId);
        if(!subject){
          throw new Error(`Subject with id ${subjectId} not found`);
        }

        const condition2 = where().equal('teacher_id',teacher.id).and().equal("subject_id",subjectId).build();

        const teacherSubject = await this.teacherSubjectRepository.find({condition:condition2});
        if(teacherSubject.length>0){
            throw new Error(`Teacher already is assigned to this subjec`)
        }

        const fields = ["teacher_id", "subject_id"];
        const values = [[teacher.id,subjectId]];

        const result = await this.teacherSubjectRepository.create({
            fields: fields,
            values: values
        });

        if (result.affectedRows === 0) {
            throw new Error("Error assigning subject to teacher");
          }
        const teacherSubjectCreated = await this.teacherSubjectRepository.findOneById(result.insertId);
        
        const res = {
            teacher: teacher.academic_id,
            subject: subject.name
          }

        return res;
    }
}
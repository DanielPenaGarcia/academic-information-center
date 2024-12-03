import { dataSource } from "../config/orm.config.js";
import { SubjectSchema } from "../schemas/subject.schema.js";
import { UserSchema } from "../schemas/user.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";


export class TeacherSubjectsService{
    constructor(){
        this.subjectRepository = dataSource.getRepository(SubjectSchema);
        this.teacherRepository = dataSource.getRepository(UserSchema);    
    }

    async asignTeacherToSubject({ academicId, subjectId }) {
     
      const teacher = await this.teacherRepository.findOne({
        where: {
          academicId: academicId,
          role: 'TEACHER',
        },
      });
    
      if (!teacher) {
        throw new BadRequestException(`Teacher with academic id ${academicId} not found`);
      }
    
 
      const subject = await this.subjectRepository.findOne({
        where: {
          id: subjectId,
        },
        relations: ['teachers'], 
      });
    
      if (!subject) {
        throw new BadRequestException(`Subject with id ${subjectId} not found`);
      }
    
      
      const existingRelation = subject.teachers.find(t => t.id === teacher.id);
    
      if (existingRelation) {
        throw new BadRequestException(`Teacher with academic id ${academicId} is already assigned to subject with id ${subjectId}`);
      }
    
      subject.teachers.push(teacher);
    
      await this.subjectRepository.save(subject);
    
      return subject;
    }
    
    async getSubjectsByTeacher({academicId}) {
      console.log(academicId); 
      const teacher = await this.teacherRepository.findOne({
        where: {
          academicId: academicId,
          role: 'TEACHER',
        },
      });
    
      if (!teacher) {
        throw new BadRequestException(`Teacher with academic id ${academicId} not found`);
      }
    
      const subjects = await this.subjectRepository.find({
        where: {
          teachers: {
            id: teacher.id,
          },
        },
        relations: ['teachers'],
      });
    
      return subjects;
    }
}
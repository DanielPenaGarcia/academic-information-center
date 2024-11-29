import { dataSource } from "../config/orm.config.js";
import { StatusClass } from "../entities/enums/status-class.enum.js";
import { StudentClassSchema } from "../schemas/student-class.schema.js";
import { InternalServerErrorException } from "../utils/exceptions/http/internal-server-error.exception.js";
import { Like } from "typeorm";
import { NotFoundException } from "../utils/exceptions/http/not-found.exception.js";

export class StudentsClassesService{
  
    constructor(){
        this.studentClasseRepository = dataSource.getRepository(StudentClassSchema);
    }

    async studentSchedule({academicId}) {
        try {
          const studentClasses = await this.studentClasseRepository.find({
            where: {
              student: {
                academicId: academicId
              },
              status: StatusClass.PENDING
            },
            relations: {
              klass: {
                subject: true,
                teacher: true
              }
            },
            select: {
              klass: {
                id: true,
                subject: {
                  name: true
                },
                teacher: {
                  names: true
                },
                startTime: true,
                days: true,
                duration: true
              }
            }
          });
          return studentClasses;
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
    }

    async getStudentClassesByStudentId({academicId},pageable,{className}){
      try{
        const studentClasses = await this.studentClasseRepository.findAndCount(
          {
            where:{
              student:{
                academicId: academicId
              },
              klass:{
                subject:{
                  name:className? Like(`%${className}%`) : undefined
                },
              },
              status:StatusClass.PENDING
            },
            relations:{
              klass:{
                subject:true
              }
            },
            select:{
              id:true,
              klass:{
                id: true,
                subject:{
                  name:true
                },
                startTime: true,
                days: true
              },
            },
            take: pageable.limit,
            skip: pageable.offset
          }
        );
        return {
          studentClasses: studentClasses[0],
          totalElements: studentClasses[1],
          totalPages: Math.ceil(studentClasses[1] / pageable.limit),
          currentPage: pageable.page,
        }
      }catch(error){
        throw new InternalServerErrorException("Can not find student class")
      }
    }

    async dropClass({academicId,studentClassId}){
      try{
        const studentClass = await this.studentClasseRepository.findOne({
          where:{
            id: studentClassId,
            student: {
              academicId: academicId
            }
          },
          relations:{
            student: true,
            klass:{
              subject:true
            }
          },
          select:{
            id:true,
            student:{
              academicId: true
            },
            klass:{
              subject:{
                name:true,
              },
              days: true,
              duration: true
            },
            status: true
          },
        });

          if(!studentClass){
            throw new NotFoundException("Class of the Student not found");
          }

          const studentClassDeleted = await this.studentClasseRepository.delete({
            id: studentClassId
          });

          if(studentClassDeleted.affected == 0){
            return {};
          }
          return studentClass;

      }catch(error){
        throw new InternalServerErrorException("Can not drop class");
      }
    }

     async gradeStudent({academicId, classId, grade}){
       if(!grade){
         throw new Error("Unassigned grade");
       }
       if (grade<0||grade>10){
         throw new Error("Invalid grade");
       }
      
       const classCondition = where().equal("id", classId).build();
       console.log(classCondition)
       const classDTO = await this.repositoryClass.findOne({
         conditions: classCondition,
       });
       if (!classDTO){
       throw new Error("Class not found");
     }
       const classRef = classDtoToEntityMapper(classDTO);

       const studentCondition = where().equal("academic_id", academicId).build();
       console.log(studentCondition)
       const studentDTO = await this.repositoryStudent.findOne({
         conditions: studentCondition,
       });
       if (!studentDTO){
         throw new Error("Student not found");
       }
       const student = classDtoToEntityMapper(studentDTO);

       const studentClassCondition = where().equal('student_id',student.id).and().equal('class_id',classId).build();
       console.log(studentClassCondition)

       const studentClass = await this.repositoryStudentClasses.findOne({condition: studentClassCondition});
      
       if (!studentClass){
         throw new Error("The student is not enrolled in said class");
       }

       const values = [];
       values.push({
         column:"grade",
         value:grade
       });
       const status = this.#getStatusByGrade({grade})
       values.push({
         column:"status",
         value:status
       });

       const conditionUpdate = where().equal('student_id',student.id).and().equal("class_id",classId).build();
       const result = await this.repositoryStudentClasses.update({setValues: values ,condition:conditionUpdate});
       return {classRef,student,grade,status}
     }

     #getStatusByGrade({grade}){
       if (grade>=approving_grade){
         return StudentClassStatus.APPROVED
       }
       return StudentClassStatus.REJECTED
     }
}
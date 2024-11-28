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
                name:true
              },
              days: true
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

    // async dropClass({academicId,classId}){

    //     const condition = where().equal('academic_id',academicId).build();

    //     const studet = await this.repositoryStudent.findOne({condition: condition});
    //     if(!studet){
    //       throw new Error(`Student with academic id ${academicId} not found`);
    //     }

    //     const clase = await this.repositoryClass.findOneById(classId);
    
    //     if(!clase){
    //       throw new Error(`Class with id ${classId} not found`);
    //     }

    //     const conditionStudentClass = where().equal('student_id',studet.id).and().equal('class_id',clase.id).build();

    //     const studentClass = await this.repositoryStudentClasses.findOne({condition:conditionStudentClass});

    //     if(!studentClass){
    //       throw Error(`Alumn doesn not have this class assigned`);
    //     }

    //     if(studentClass.status !='PENDING'){
    //       throw Error(`Can not drop class if is not PENDING`);
    //     }

    //     const conditionDelete = where().equal('student_id',studet.id).and().equal('class_id',clase.id).build();

    //     const result = await this.repositoryStudentClasses.delete({condition: conditionDelete});
    //     if(result.affectedRows!=1){
    //       throw Error(`Something went wrong droping class`);
    //     }
    //     const studentClassDTO = studentClassDtoToEntityMapper(studentClass);
    //     studentClassDTO.classRef = clase;
    //     studentClassDTO.student = studet;
    //     return studentClassDTO;
    // }

    // async enrollClass({academicId, classId}){
    //   const classCondition = where().equal("id", classId).build();
    //   const classDTO = await this.repositoryClass.findOne({
    //     conditions: classCondition,
    //   });
    //   if (!classDTO){
    //     throw new Error("Class not found");
    //   }
    //   const classRef = classDtoToEntityMapper(classDTO);

    //   const studentCondition = where().equal("academic_id", academicId).build();
    //   const studentDTO = await this.repositoryStudent.findOne({
    //     conditions: studentCondition,
    //   });
    //   if (!studentDTO){
    //     throw new Error("Student not found");
    //   }
    //   const student = studentDtoToEntityMapper(studentDTO);

    //   const studentClassCondition = where().equal('student_id',student.id).and().equal('class_id',classId).build();
    //   const studentClassDTO = await this.repositoryStudentClasses.findOne({condition: studentClassCondition});
      
    //   if (studentClassDTO){
    //     throw new Error("Class alerady enrolled");
    //   }


    //   const fields = ["student_id", "class_id","status"];
    //   const values = [[student.id,classId,StudentClassStatus.PENDING]];
    //   const result = await this.repositoryStudentClasses.create({
    //     fields: fields,
    //     values: values,
    //   });
    //   if (result.affectedRows === 0) {
    //     throw new Error("Error enrolling");
    //   }
    //   return {classRef,student}
    // }

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
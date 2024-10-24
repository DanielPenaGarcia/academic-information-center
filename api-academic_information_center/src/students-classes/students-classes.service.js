import { StudentClassStatus } from "../entities/enums/student-class-status.enum.js";
import { approving_grade } from "../utils/constanst/approving-grade.constant.js";
import { classDtoToEntityMapper } from "../utils/mappers/class-dto-to-entity.mapper.js";
import { studentDtoToEntityMapper } from "../utils/mappers/student-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class StudentsClassesService{
    constructor(){
        this.repositoryStudent = new Repository(RepositoryTable.STUDENT);
        this.repositoryClass = new Repository(RepositoryTable.CLASS);
        this.repositoryStudentClasses = new Repository(RepositoryTable.STUDENTS_CLASSES);
    }

    async dropClass({academicId,classId}){

        const condition = where().equal('academic_id',academicId).build();

        const studet = await this.repositoryStudent.findOne({condition: condition});
        if(!studet){
          throw new Error(`Student with academic id ${academicId} not found`);
        }

        const clase = await this.repositoryClass.findOneById(classId);
    
        if(!clase){
          throw new Error(`Class with id ${classId} not found`);
        }

        const conditionDelete = where().equal('student_id',studet.id).and().equal('class_id',clase.id).build();

        //TODO: Consultar a la clase eliminada
        const result = await this.repositoryStudentClasses.delete({condition: conditionDelete});
        //TODO: Regresar la clase eliminada
        return result.affectedRows;
    }

    async enrollClass({academicId, classId}){
      const classCondition = where().equal("id", classId).build();
      const classDTO = await this.repositoryClass.findOne({
        conditions: classCondition,
      });
      if (!classDTO){
        throw new Error("Class not found");
      }
      const classRef = classDtoToEntityMapper(classDTO);

      const studentCondition = where().equal("academic_id", academicId).build();
      const studentDTO = await this.repositoryStudent.findOne({
        conditions: studentCondition,
      });
      if (!studentDTO){
        throw new Error("Student not found");
      }
      const student = studentDtoToEntityMapper(studentDTO);

      const studentClassCondition = where().equal('student_id',student.id).and().equal('class_id',classId).build();
      const studentClassDTO = await this.repositoryStudentClasses.findOne({condition: studentClassCondition});
      
      if (studentClassDTO){
        throw new Error("Class alerady enrolled");
      }


      const fields = ["student_id", "class_id","status"];
      const values = [[student.id,classId,StudentClassStatus.PENDING]];
      const result = await this.repositoryStudentClasses.create({
        fields: fields,
        values: values,
      });
      if (result.affectedRows === 0) {
        throw new Error("Error enrolling");
      }
      return {classRef,student}
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
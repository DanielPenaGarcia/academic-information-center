import { StudentClassStatus } from "../entities/enums/student-class-status.enum.js";
import { approving_grade } from "../utils/constanst/approving-grade.constant.js";
import { classDtoToEntityMapper } from "../utils/mappers/class-dto-to-entity.mapper.js";
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

        const result = await this.repositoryStudentClasses.delete({condition: conditionDelete});
        return result.affectedRows;
    }

    async enrollClass({studentId, classId}){
      const classCondition = where().equal("class_id", classId).build();
      const classDTO = await this.repositoryStudent.findOne({
        conditions: classCondition,
      });
      if (!classDTO){
        throw new Error("Class not found");
      }
      const classRef = classDtoToEntityMapper(classDTO);

      const studentCondition = where().equal("student", studentId).build();
      const studentDTO = await this.repositoryStudent.findOne({
        conditions: studentCondition,
      });
      if (!studentDTO){
        throw new Error("Student not found");
      }
      const student = classDtoToEntityMapper(studentDTO);

      const fields = ["student_id", "class_id","status"];
      const values = [[studentId,classId,StudentClassStatus.PENDING]];
      const result = await this.repositoryStudentClasses.create({
        fields: fields,
        values: values,
      });
      if (result.affectedRows === 0) {
        throw new Error("Error enrolling");
      }
      return {classRef,student}
    }

    async gradeStudent({studentId, classId, grade}){
      if(!grade){
        throw new Error("Unassigned grade");
      }
      if (grade<0||grade>10){
        throw new Error("Invalid grade");
      }
      
      const classCondition = where().equal("class_id", classId).build();
      const classDTO = await this.repositoryStudent.findOne({
        conditions: classCondition,
      });
      if (!classDTO){
        throw new Error("Class not found");
      }
      const classRef = classDtoToEntityMapper(classDTO);

      const studentCondition = where().equal("student", studentId).build();
      const studentDTO = await this.repositoryStudent.findOne({
        conditions: studentCondition,
      });
      if (!studentDTO){
        throw new Error("Student not found");
      }
      const student = classDtoToEntityMapper(studentDTO);

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

      const conditionUpdate = where().equal('academic_id',studentId).and().equal("class_id",classId).build();
      const result = await this.repositoryStudentClasses.update({setValues: values ,condition:conditionUpdate});
      return {classRef,student,grade,status}
    }

    #getStatusByGrade({grade}){
      if (grade>approving_grade){
        return StudentClassStatus.APPROVED
      }
      return StudentClassStatus.REJECTED
    }

}
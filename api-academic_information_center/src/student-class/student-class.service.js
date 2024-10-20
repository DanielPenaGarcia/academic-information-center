import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class StudentClassService{
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
}
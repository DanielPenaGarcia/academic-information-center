import { Repository, RepositoryTable } from "../utils/repository/repository.js";
import { BusinessException } from "../utils/exceptions/business.exception.js";
import { where } from "../query-builder/condition.builder.js";
export class StudentsService {
    constructor(){
        this.studentsRepository = new Repository(RepositoryTable.STUDENT);
    }

    async createStudent(createStudentDTO) {
        if (!signUpStudentDTO) {
            throw new BusinessException("Invalid student data");
        }
    }
}
import {
  Repository,
  RepositoryTable,
} from "../../utils/repository/repository.js";
import { BusinessException } from "../../utils/exceptions/business.exception.js";

export class SubjectsService {
  constructor() {
    this.subjectRepository = new Repository(RepositoryTable.SUBJECT);
    this.courseMapRepository = new Repository(RepositoryTable.COURSEMAP);
  }

  async createSubject(subjectDTO) {
    try {
      const courseMap = await this.courseMapRepository.findOneById(
        subjectDTO.courseMapId
      );
      if (!courseMap) {
        throw new BusinessException("Course map not found");
      }
      const fields = ["name", "hours_per_week", "semester", "course_map_id"];
      const values = [
        [
          subjectDTO.name,
          subjectDTO.hoursPerWeek,
          subjectDTO.semester,
          subjectDTO.courseMapId,
        ],
      ];
      const result = await this.subjectRepository.create({ fields, values });
      if (result.affectedRows === 0) {
        throw new Error("Subject not created");
      }
      const subjectSaved = await this.subjectRepository.findOneById(
        result.insertId
      );
      return subjectSaved;
    } catch (error) {
      throw new Error(
        `Error occurred while creating subject: ${error.message}`
      );
    }
  }
}

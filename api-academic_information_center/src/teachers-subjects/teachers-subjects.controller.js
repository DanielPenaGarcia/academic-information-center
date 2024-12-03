import { TeacherSubjectsService } from "./teachers-subjects.service.js";

export class TeacherSubjectsController {
  constructor() {
    this.teacherSubjecstService = new TeacherSubjectsService();
  }

  async asignSubjectToTeacher(req, res) {
    try {
      const { academicId, subjectId } = req.body;
      const result = await this.teacherSubjecstService.asignTeacherToSubject({
        academicId,
        subjectId,
      });
      res.status(201).json(result);
    } catch (error) {
      if (error.message === "Forbidden") {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  #validateAsignSubjectToTeacher(req) {
    const userRequesting = req.user;
    if (userRequesting.role === UserRole.TEACHER) {
      if (userRequesting.academicId !== req.body.academicId) {
        throw new Error("Forbidden");
      }
    } else if (userRequesting.role !== UserRole.ADMINISTRATOR) {
      throw new Error("Forbidden");
    }
  }
}


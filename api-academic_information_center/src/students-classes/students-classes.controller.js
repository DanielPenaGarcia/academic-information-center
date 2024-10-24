import { UserRole } from "../entities/enums/roles.enum.js";
import { StudentsClassesService } from "./students-classes.service.js";

export class StudentsClassesController {
  constructor() {
    this.studentsClassesService = new StudentsClassesService();
  }

  async dropClass(req, res) {
    try {
      this.#validateUser(req, res);
      const { academic_id, classId } = req.body;

      const classDroped = await this.studentsClassesService.dropClass({
        academic_id,
        classId,
      });

      if (!classDroped) {
        return res.status(500).json({ message: `Error droping class` });
      }
      //TODO: Regresar el objeto de la clase eliminada
      return res.status(200).json(classDroped);
    } catch (error) {
      if (error.message === "Forbidden") {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async enrollClass(req, res) {
    try {
      this.#validateUser(req, res);
      const { academicId, classId } = req.body;
      const enrolledClass = await this.studentsClassesService.enrollClass({
        academicId,
        classId,
      });
      if (!enrolledClass) {
        return res
          .status(500)
          .send(
            `Error enrolling the class, try paying the classes that you owe us first`
          );
      }
      //TODO: Eliminar datos que regresen nulos
      return res.status(200).send(enrolledClass.classRef);
    } catch (error) {
      if (error.message === "Forbidden") {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async gradeStudent(req, res) {
    try {
      this.#validateTeacher(req);
      const { academicId, classId, grade } = req.body;
      const result = await this.studentsClassesService.gradeStudent({
        academicId,
        classId,
        grade,
      });
      if (!result) {
        return res.status(500).send(`Error grading the student`);
      }
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  #validateUser(req) {
    const userRequesting = req.user;
    if (
      userRequesting.role !== UserRole.STUDENT &&
      userRequesting.role !== UserRole.ADMINISTRATOR
    ) {
      throw new Error("Forbidden");
    }
    if (userRequesting.role === UserRole.STUDENT) {
      if (userRequesting.academicId !== req.body.academicId) {
        throw new Error("Forbidden");
      }
    }
  }

  #validateTeacher(req) {
    const userRequesting = req.user;
    if (userRequesting.role != UserRole.TEACHER) {
      throw new Error("Forbidden");
    }
  }
}
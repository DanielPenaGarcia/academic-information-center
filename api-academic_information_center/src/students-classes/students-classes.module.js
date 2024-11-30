import express from "express";
import { StudentsClassesController } from "./students-classes.controller.js";

export const router = express.Router();

const studentsClassesController = new StudentsClassesController();
const PATH = "/student";

router.get(
  `${PATH}/:studentId/classes`,
  studentsClassesController.getStudentClassesByStudentId.bind(
    studentsClassesController
  )
);

router.delete(
  `${PATH}/:academicId/classes/:studentClassId`,
  studentsClassesController.dropClass.bind(studentsClassesController)
);

router.get(
  `${PATH}/schedule/:academicId`,
  studentsClassesController.studentSchedule.bind(studentsClassesController)
);

router.get(
  `${PATH}/schedule/:academicId/print`,
  studentsClassesController.printStudentSchedule.bind(studentsClassesController)
);

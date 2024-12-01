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

router.get(
  `${PATH}/:academicId/classes/:classId`,
  studentsClassesController.getStudentInClass.bind(studentsClassesController)
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

router.get(
  `${PATH}/classes/:classId`,
  studentsClassesController.getStudentsInClass.bind(studentsClassesController)
)

router.patch(
  `${PATH}/:academicId/classes/:classId/grade`,
  studentsClassesController.patchGradeStudent.bind(studentsClassesController)
)
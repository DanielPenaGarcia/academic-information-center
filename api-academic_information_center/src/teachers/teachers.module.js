import express from "express";
import { TeacherController } from "./teachers.controller.js";
 import { teacherSerializable } from "./middlewares/teacher-create.middleware.js";

export const router = express.Router();
const PATH = "/teacher"

const teacherController = new TeacherController();

const middlewares = (req, res, next) => {
  //teacherSerializable(req, res, next);
  next();
};

router.get(
  PATH,
  middlewares,
  teacherController.getTeacherInfoByAcademicId.bind(teacherController)
)

router.post(
  PATH,
  middlewares,
  teacherController.createTeacher.bind(teacherController)
)

router.patch(
  PATH,
  middlewares,
  teacherController.updateTeacher.bind(teacherController)
);

router.get(
  `${PATH}/:academicId/classes`,
  middlewares,
  teacherController.getFindTeacherClassesByAcademicId.bind(teacherController)
);
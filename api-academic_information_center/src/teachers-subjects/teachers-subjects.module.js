import express from "express";
import { TeacherSubjectsController } from "./teachers-subjects.controller.js";

export const router = express.Router();

const teacherSubjectsController = new TeacherSubjectsController();

const path = "/subjects/teachers";

const middlewares = (req, res, next) => {
  roleAdminGuard(req, res, next);
};


router.get(
  `${path}/:teacherAcademicId`,
  teacherSubjectsController.getSubjectsByTeacher.bind(teacherSubjectsController)
);

router.post(
  `${path}`,
  teacherSubjectsController.asignSubjectToTeacher.bind(teacherSubjectsController)
);


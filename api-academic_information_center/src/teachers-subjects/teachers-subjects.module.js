import express from "express";
import { TeacherSubjectsController } from "./teachers-subjects.controller.js";

export const router = express.Router();

const teacherSubjectsController = new TeacherSubjectsController();

router.post(
  "/teacher/subject",
  teacherSubjectsController.asignSubjectToTeacher.bind(teacherSubjectsController)
);
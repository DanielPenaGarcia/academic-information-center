import express from "express";
import { ClassesController } from "./classes.controller.js";

export const router = express.Router();

const classesController = new ClassesController();

router.get(
  "/classes/schedule/students/:academicId",
  classesController.findScheduleByStudentAcademicId.bind(classesController)
);

router.get(
  "/classes/schedule/teachers/:academicId",
  classesController.findScheduleByTeacherAcademicId.bind(classesController)
);

router.post(
  "/class/review",
  classesController.generateReviewClass.bind(classesController));

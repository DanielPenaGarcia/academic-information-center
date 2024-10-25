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

router.post("/classes", classesController.create.bind(classesController));

router.patch("/classes", classesController.update.bind(classesController));

router.patch(
  "/classes/teacher",
  classesController.assignTeacher.bind(classesController)
)

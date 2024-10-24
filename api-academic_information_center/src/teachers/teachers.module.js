import express from "express";
import { TeacherController } from "./teachers.controller.js";

export const router = express.Router();

const teacherController = new TeacherController();

router.post("/teacher", teacherController.createTeacher.bind(teacherController));

router.patch(
  "/teacher",
  teacherController.updateTeacher.bind(teacherController)
);
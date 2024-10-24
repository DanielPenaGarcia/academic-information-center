import express from "express";
import { StudentController } from "./student.controller.js";

export const router = express.Router();

const studentsController = new StudentController();

router.post(
  "/student",
  studentsController.createStudent.bind(studentsController)
);

router.patch(
  "/student",
  studentsController.updateStudent.bind(studentsController)
);
import express from "express";
import { StudentController } from "./student.controller.js";
import { serializable } from "../middlewares/serializable.middleware.js";

const middlewares = (req, res, next) => {
  serializable(req, res, next);
};

export const router = express.Router();

const studentsController = new StudentController();

router.post(
  "/student",
  studentsController.createStudent.bind(studentsController)
);

router.patch(
  "/student",
  middlewares,
  studentsController.updateStudent.bind(studentsController)
);
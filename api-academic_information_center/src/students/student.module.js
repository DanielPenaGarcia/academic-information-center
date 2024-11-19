import express from "express";
import { StudentController } from "./student.controller.js";
import { serializable } from "../middlewares/serializable.middleware.js";

const middlewares = (req, res, next) => {
  serializable(req, res, next);
};

export const router = express.Router();

const studentsController = new StudentController();
const PATH = "/student"

router.get(
  PATH,
  middlewares,
  studentsController.getStudentInfoByAcademicId.bind(studentsController)
)

router.post(
  PATH,
  studentsController.createStudent.bind(studentsController)
);

router.patch(
  PATH,
  //middlewares,
  studentsController.updateStudent.bind(studentsController)
);
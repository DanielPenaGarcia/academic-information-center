import express from "express";
import { TeacherController } from "./teachers.controller.js";
import { serializable } from "../middlewares/serializable.middleware.js";

const middlewares = (req, res, next) => {
  serializable(req, res, next);
};

export const router = express.Router();

const teacherController = new TeacherController();

router.post(
  "/teacher",
  teacherController.createTeacher.bind(teacherController)
)

router.patch(
  "/teacher",
  middlewares,
  teacherController.updateTeacher.bind(teacherController)
);
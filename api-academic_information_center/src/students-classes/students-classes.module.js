import express from "express";
import { StudentsClassesController } from "./student-class.controller.js";

export const router = express.Router();

const studentsClassesController = new StudentsClassesController();

router.delete(
    "/student/drop/class",
    studentsClassesController.dropClass.bind(studentsClassesController));


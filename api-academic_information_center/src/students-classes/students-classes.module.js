import express from "express";
import { StudentsClassesController } from "./students-classes.controller.js";

export const router = express.Router();

const studentsClassesController = new StudentsClassesController();

router.delete(
    "/student/class",
    studentsClassesController.dropClass.bind(studentsClassesController));


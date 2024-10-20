import express from "express";
import { StudentClassController } from "./student-class.controller.js";

export const router = express.Router();

const studentClassController = new StudentClassController();

router.delete(
    "/student/drop/class",
    studentClassController.dropClass.bind(studentClassController));


import express from "express";
import { StudentsReviewController } from "./students-reviews.controller.js";

export const router = express.Router();

const studentsReviewController = new StudentsReviewController();


router.post(
  "/student/review",
  studentsReviewController.generateStudentReview.bind(studentsReviewController));
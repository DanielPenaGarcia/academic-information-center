import express from "express";
import { ClassesReviewController } from "./classes-review.controller.js";

export const router = express.Router();

const classesReviewController = new ClassesReviewController();


router.post(
  "/class/review",
  classesReviewController.generateReviewClass.bind(classesReviewController));

import express from "express";
import { ClassesReviewController } from "./classes-review.controller.js";

export const router = express.Router();

const classesReviewController = new ClassesReviewController();
const PATH = "/class/review"


router.post(
  PATH,
  classesReviewController.generateReviewClass.bind(classesReviewController));

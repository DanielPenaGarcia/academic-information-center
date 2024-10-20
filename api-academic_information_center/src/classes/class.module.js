import express from "express";
import { ClassController } from "./class.controller";

export const router = express.Router();

const classController = new ClassController();

router.post("/class/review",classController.generateReviewClass.bind(classController));


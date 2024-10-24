import express from "express";
import { CourseMapController } from "./course-map.controller.js";

export const router = express.Router();

const courseMapController = new CourseMapController();

router.post(
  "/course-map",
  courseMapController.createCourseMap.bind(courseMapController)
);
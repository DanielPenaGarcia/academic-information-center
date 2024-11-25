import express from "express";
import { CourseMapController } from "./course-map.controller.js";
import { role } from "../entities/enums/role.enum.js";
import { roleAdminGuard } from "../middlewares/role-admin.guard.middleware.js";

export const router = express.Router();

const path = "/course-maps";
const courseMapController = new CourseMapController();

const middlewares = (req, res, next) => {
  next();
};

router.post(
  `${path}`, roleAdminGuard, middlewares,
  courseMapController.createCourseMap.bind(courseMapController)
);

router.get(
  `${path}`, middlewares,
  courseMapController.getAllCourseMaps.bind(courseMapController)
);

router.get(
  `${path}/:year`, middlewares,
  courseMapController.getCourseMapByYear.bind(courseMapController)
)
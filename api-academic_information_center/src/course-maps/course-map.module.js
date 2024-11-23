import express from "express";
import { CourseMapController } from "./course-map.controller.js";
import { role } from "../entities/enums/role.enum.js";
import { roleAdminGuard } from "../middlewares/role-admin.guard.middleware.js";

export const router = express.Router();

const path = "/course-maps";
const courseMapController = new CourseMapController();

const middlewares = (req, res, next) => {
  roleAdminGuard(req, res, next);
};

router.post(
  `${path}`, middlewares,
  courseMapController.createCourseMap.bind(courseMapController)
);
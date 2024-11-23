import express from "express";
import { EnrollmentPeriodsController } from "./enrollment-periods.controller.js";
import { roleAdminGuard } from "../middlewares/role-admin.guard.middleware.js";

export const router = express.Router();

const path = "/enrollment-periods";

const middlewares = (req, res, next) => {
  next();
};

const enrollmentPeriodsController = new EnrollmentPeriodsController();

router.post(
  `${path}`,
  roleAdminGuard,
  middlewares,
  enrollmentPeriodsController.postCreateEnrollmentPeriod.bind(
    enrollmentPeriodsController
  )
);

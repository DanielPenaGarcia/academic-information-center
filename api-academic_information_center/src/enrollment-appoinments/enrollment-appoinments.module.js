import express from "express";
import { EnrollmentAppoinmentsController } from "./enrollment-appoinments.controller.js";

export const router = express.Router();

const path = "/enrollment-appoinments";

const middlewares = (req, res, next) => {
  next();
};

const enrollmentPeriodsController = new EnrollmentAppoinmentsController();

router.get(`${path}/student`, middlewares, enrollmentPeriodsController.findEnrollmentAppoinmentsByAcademicId.bind(enrollmentPeriodsController));
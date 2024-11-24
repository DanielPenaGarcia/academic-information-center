import express from "express";
import { ClassesController } from "./classes.controller.js";
import { roleAdminGuard } from "../middlewares/role-admin.guard.middleware.js";
import { guard } from "../middlewares/guard.middleware.js";


export const router = express.Router();

const path = "/classes";

const classesController = new ClassesController();

const middlewares = (req, res, next) => {
    next();
};

router.post(`${path}`, roleAdminGuard, middlewares, classesController.postCreateClass.bind(classesController));
router.patch(`${path}/assign-teacher`, roleAdminGuard, middlewares, classesController.AssignTeacherToClass.bind(classesController));
router.post(`${path}/availableClasses`, middlewares, classesController.getAvailableClassesByStudent.bind(classesController));
router.post(`${path}/enroll`, middlewares, classesController.enrollStudent.bind(classesController));
router.post(`${path}/enrolledClasses`, middlewares, classesController.getEnrolledClasses.bind(classesController));
router.patch(`${path}/dropClass`, middlewares, classesController.dropClass.bind(classesController));




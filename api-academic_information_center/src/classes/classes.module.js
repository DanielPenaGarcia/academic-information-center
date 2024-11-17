import express from "express";
import { ClassesController } from "./classes.controller.js";
import { roleAdminGuard } from "../middlewares/role-admin.guard.middleware.js";
import { guard } from "../middlewares/guard.middleware.js";


export const router = express.Router();

const authPath = "/classes";

const classesController = new ClassesController();

const middlewares = (req, res, next) => {
    next();
};

router.post(`${authPath}`, roleAdminGuard, middlewares, classesController.postCreateClass.bind(classesController));
router.post(`${authPath}/availableClasses`, guard, middlewares, classesController.getAvailableClassesByStudent.bind(classesController));
router.post(`${authPath}/enroll`, guard, middlewares, classesController.enrollStudent.bind(classesController));
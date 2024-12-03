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


router.get(`${path}`, roleAdminGuard, middlewares, classesController.getClassesByTeacher.bind(classesController));
router.get(`${path}/:id`, middlewares, classesController.getClassById.bind(classesController));
router.post(`${path}`, roleAdminGuard, middlewares, classesController.postCreateClass.bind(classesController));
router.get(`${path}/noTeacher`, roleAdminGuard, middlewares, classesController.getClassesWithoutTeacher.bind(classesController));
router.get(`${path}/teacherSubjects`, roleAdminGuard, middlewares, classesController.getClassesByTeacherEspeciality.bind(classesController));
router.patch(`${path}/assign-teacher`, roleAdminGuard, middlewares, classesController.AssignTeacherToClass.bind(classesController));
router.post(`${path}/availableClasses`, middlewares, classesController.getAvailableClassesByStudent.bind(classesController));
router.post(`${path}/enroll`, middlewares, classesController.enrollStudent.bind(classesController));
router.post(`${path}/enrolledClasses`, middlewares, classesController.getEnrolledClasses.bind(classesController));
router.patch(`${path}/dropClass`, middlewares, classesController.dropClass.bind(classesController));
router.patch(`${path}/:id/description`, middlewares, classesController.patchClassDescription.bind(classesController));





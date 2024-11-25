import express from 'express';
import { SubjectsController } from './subjects.controller.js';
import { roleAdminGuard } from '../middlewares/role-admin.guard.middleware.js';

export const router = express.Router();

const subjectsController = new SubjectsController();

const middlewares = (req, res, next) => {
    next();
  };

const path = '/subjects';

router.post(`${path}`, roleAdminGuard, middlewares, subjectsController.postCreateSubject.bind(subjectsController));

router.get(`${path}/course-map/year/:year`, subjectsController.getFindSubjects.bind(subjectsController));

router.get(`${path}/:subjectId`, subjectsController.getFindSubjectById.bind(subjectsController));

import express from 'express';
import { SubjectsController } from './subjects.controller.js';

export const router = express.Router();

const subjectsController = new SubjectsController();

const path = '/subjects';

router.get(`${path}`, subjectsController.getFindSubjects.bind(subjectsController));

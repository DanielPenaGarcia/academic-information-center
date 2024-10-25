import express from 'express';
import { SubjectsController } from './subjects.controller.js';

export const router = express.Router();

const subjectsController = new SubjectsController();

router.post('/subject', subjectsController.createSubject.bind(subjectsController));


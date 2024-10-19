import express from 'express';
import { AuthController } from './auth.controller.js';

export const router = express.Router();

const authController = new AuthController();

router.post('/auth/login/teacher', authController.teacherLogin.bind(authController));
router.post('/auth/login/student', authController.studentLogin.bind(authController));
router.post('/auth/login/administrator', authController.administratorLogin.bind(authController));

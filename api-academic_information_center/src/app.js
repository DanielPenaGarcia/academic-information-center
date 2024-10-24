import express from 'express';
import {router as ClassesRoute} from './classes/classes.module.js';
import {router as authRouter} from './auth/auth.module.js';
import {router as TeacherRouter} from './teachers/teachers.module.js'
import {router as TeacherSubjectRouter} from './teachers-subjects/teachers-subjects.module.js'
import {router as StudentReviewRouter} from './students-reviews/students-reviews.module.js';
import { router as StudentRouter } from './students/student.module.js';
import { router as ClassesReviewRouter } from './classes-review/classes-review.module.js';
import {router as StudentClassRouter} from './students-classes/students-classes.module.js';
import {router as CourseMapRouter} from './course-maps/course-map.module.js';
import{router as SubjectRouter} from './subjects/subjects.module.js';
// import cookieParser from 'cookie-parser';

import cookieParser from 'cookie-parser';

import { guard } from './middlewares/guard.middleware.js';
import { refreshToken } from './middlewares/refresh-token.middleware.js';
import cors from 'cors';
import { errorLogger } from './middlewares/error-logger.middleware.js';
import { errorHandler } from './middlewares/error-handleler.middleware.js';
const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:5500',  // Especifica el origen de la aplicación frontend
  credentials: true,  // Permitir envío de cookies y otros encabezados de autenticación
};
// Middleware para parsear JSON en las peticiones
app.use(cors(corsOptions));
app.use(express.json());

// Prefijo '/api' para todas las rutas de auth
// Usar el enrutador para las rutas de autenticación
// app.use(cookieParser());
// app.use(refreshToken);
app.use(guard);
// app.use('/api', ClassesRoute);
app.use('/api',TeacherSubjectRouter);
app.use('/api',TeacherRouter);
app.use('/api',StudentReviewRouter);
app.use('/api',StudentRouter);
app.use('/api',ClassesReviewRouter);
app.use('/api',StudentClassRouter);
app.use('/api',CourseMapRouter);
app.use('/api', SubjectRouter);

app.use('/api', authRouter);  // Prefijo '/api' para todas las rutas de auth
app.use(errorLogger);
app.use(errorHandler)
// Puerto de la aplicación
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` localhost:${PORT}`);
});



// const studentsService = new StudentsService();

// const schedules = await studentsService.findScheduleByStudentId({ studentId: 4 });
// console.log(schedules);

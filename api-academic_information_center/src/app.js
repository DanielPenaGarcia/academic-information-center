
import express from 'express';
import {router as ClassRoute} from './classes/classes.module.js';
import {router as StudentClassRoute} from './student-class/student-class.module.js' 
import cookieParser from 'cookie-parser';
import { guard } from './middlewares/guard.middleware.js';
import { refreshToken } from './middlewares/refresh-token.middleware.js';
const app = express();


// Middleware para parsear JSON en las peticiones
app.use(express.json());

// // Middleware para parsear JSON en las peticiones
app.use(express.json());

// Prefijo '/api' para todas las rutas de auth
// Usar el enrutador para las rutas de autenticación
app.use(cookieParser());
app.use(refreshToken);
app.use(guard);
app.use('/api', authRouter);  // Prefijo '/api' para todas las rutas de auth
app.use('/api', classesRouter);
// Puerto de la aplicación
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const studentsService = new StudentsService();

// const schedules = await studentsService.findScheduleByStudentId({ studentId: 4 });
// console.log(schedules);

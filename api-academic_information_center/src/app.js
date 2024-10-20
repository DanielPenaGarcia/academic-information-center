// import express from 'express';
// import { router as authRouter } from './auth/auth.module.js';
// const app = express();
// import { TeachersService } from './teachers/teachers.service.js';
// import cookieParser from 'cookie-parser';
// import { guard } from './middlewares/guard.middleware.js';

import { StudentsService } from "./students/students.service.js";

// // Middleware para parsear JSON en las peticiones
// app.use(express.json());

// // const teachersService = new TeachersService();
// // const teacher = await teachersService.createTeacher({ names: 'Daniel Armando', fatherLastName: 'Peña', motherLastName: 'García', curp: 'PEGD920202HDFNNS09' });
// // console.log(teacher);

// // Usar el enrutador para las rutas de autenticación
// app.use(cookieParser());
// app.use(guard);
// app.use('/api', authRouter);  // Prefijo '/api' para todas las rutas de auth
// // Puerto de la aplicación
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const studentsService = new StudentsService();

const schedules = await studentsService.findScheduleByStudentId({ studentId: 4 });
console.log(schedules);
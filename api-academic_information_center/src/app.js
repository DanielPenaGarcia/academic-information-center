
import express from 'express';
import {router as ClassRoute} from './classes/classes.module.js';
import {router as StudentClassRoute} from './student-class/student-class.module.js' 
const app = express();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// // Middleware para parsear JSON en las peticiones
app.use(express.json());

// // const teachersService = new TeachersService();
// // const teacher = await teachersService.createTeacher({ names: 'Daniel Armando', fatherLastName: 'Peña', motherLastName: 'García', curp: 'PEGD920202HDFNNS09' });
// // console.log(teacher);

// // Usar el enrutador para las rutas de autenticación
// app.use(cookieParser());
// app.use(guard);
app.use('/api', ClassRoute);  // Prefijo '/api' para todas las rutas de auth
// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const studentsService = new StudentsService();

// const schedules = await studentsService.findScheduleByStudentId({ studentId: 4 });
// console.log(schedules);

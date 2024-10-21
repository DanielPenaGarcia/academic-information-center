import express from 'express';
import { router as authRouter } from './auth/auth.module.js';
import { router as classesRouter } from './classes/classes.module.js';
const app = express();
import cookieParser from 'cookie-parser';
import { guard } from './middlewares/guard.middleware.js';
import { refreshToken } from './middlewares/refresh-token.middleware.js';

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// const teachersService = new TeachersService();
// const teacher = await teachersService.createTeacher({ names: 'Daniel Armando', fatherLastName: 'Peña', motherLastName: 'García', curp: 'PEGD920202HDFNNS09' });
// console.log(teacher);

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
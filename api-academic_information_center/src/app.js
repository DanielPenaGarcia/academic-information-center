import express from 'express';
import { router as authRouter } from './auth/auth.module.js';
const app = express();
import { TeachersService } from './teachers/teachers.service.js';

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Usar el enrutador para las rutas de autenticación
app.use('/api', authRouter);  // Prefijo '/api' para todas las rutas de auth

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
const app = express();
import {router} from './classes/class.module.js'

app.use(express.json());

app.use('/api', router);  // Prefijo '/api' para todas las rutas de auth
// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

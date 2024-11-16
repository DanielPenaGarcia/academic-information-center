import { dataSource } from "./config/orm.config.js";
import { excecuteAllTriggers } from "./utils/functions/excecute-all-triggers.function.js";
import express from "express";

//Constants
import { API_NAME } from "./utils/constanst/api-name.constant.js";
import { API_VERSION } from "./utils/constanst/api-version.constant.js";

//Routers
import { router as AuthRouter } from "./auth/auth.module.js";

//Middlewares
import { errorHandler } from "./middlewares/error-handleler.middleware.js";

//API
const API_URL = `/${API_NAME}/${API_VERSION}`
const PORT = process.env.PORT || 3000;

//App
const app = express();

//Middlewares
app.use(express.json());

//Routers
app.use(API_URL, AuthRouter);

//Error Handler
app.use(errorHandler);

//Database
await dataSource.initialize();
await excecuteAllTriggers(dataSource);

//Server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/${API_NAME}/${API_VERSION}`);
});
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
import { API_PATH } from "./utils/constanst/api-path.constant.js";
import { guard } from "./middlewares/guard.middleware.js";

//API
const PORT = process.env.PORT || 3000;

//App
const app = express();

//Middlewares
app.use(express.json());
app.use(guard);

//Routers
app.use(API_PATH, AuthRouter);

//Error Handler
app.use(errorHandler);

//Database
await dataSource.initialize();
await excecuteAllTriggers(dataSource);

//Server
app.listen(PORT, () => {
  console.log(`http://localhost:${API_PATH}`);
});
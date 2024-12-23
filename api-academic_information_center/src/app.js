import { dataSource } from "./config/orm.config.js";
import { excecuteAllTriggers } from "./utils/functions/excecute-all-triggers.function.js";
import express from "express";

//Constants

//Routers
import { router as AuthRouter } from "./auth/auth.module.js";
import { router as SeedRouter } from "./seed/seed.module.js";
import { router as TeacherRouter } from "./teachers/teachers.module.js";
import { router as ClassRouter } from "./classes/classes.module.js";
import { router as SubjectRouter } from "./subjects/subjects.module.js";
import {router as StudentRouter} from "./students/student.module.js";
import {router as StudentClassesRouter} from "./students-classes/students-classes.module.js"
import {router as CourseMapRouter} from "./course-maps/course-map.module.js";
import {router as SubjectTeacherRouter} from "./teachers-subjects/teachers-subjects.module.js";
import {router as EnrollmentPeriodRouter} from "./enrollment-periods/enrollment-periods.module.js";
import {router as ClassReviewRouter} from "./classes-review/classes-review.module.js";

//Middlewares
import { errorHandler } from "./middlewares/error-handleler.middleware.js";
import { API_PATH } from "./utils/constanst/api-path.constant.js";
import { guard } from "./middlewares/guard.middleware.js";
import cors from "cors";

//API
const PORT = process.env.PORT || 3000;

//App
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(guard);

//Routers
app.use(API_PATH, AuthRouter);
app.use(API_PATH, ClassRouter);
app.use(API_PATH, SubjectRouter);
app.use(API_PATH, SeedRouter);
app.use(API_PATH,TeacherRouter);
app.use(API_PATH,StudentRouter);
app.use(API_PATH,StudentClassesRouter);
app.use(API_PATH, CourseMapRouter);
app.use(API_PATH, SubjectTeacherRouter);
app.use(API_PATH, EnrollmentPeriodRouter);
app.use(API_PATH,ClassReviewRouter);

//Error Handler
app.use(errorHandler);

//Database
await dataSource.initialize();
await excecuteAllTriggers(dataSource);

//Server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}${API_PATH}`);
});

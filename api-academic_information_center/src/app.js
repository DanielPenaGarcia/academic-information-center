import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { guard } from "./middlewares/guard.middleware.js";
import { errorHandler } from "./middlewares/error-handleler.middleware.js";
import { refreshToken } from "./middlewares/refresh-token.middleware.js";
import { API_NAME } from "./utils/constanst/api-name.constant.js";
import { API_VERSION } from "./utils/constanst/api-version.constant.js";
import { router as AuthRouter } from "./auth/auth.module.js";
import { router as StudentsRouter } from "./students/student.module.js";
import { router as TeacherRouter } from "./teachers/teachers.module.js";
import { router as CourseMapsRouter } from "./course-maps/course-map.module.js";
import { router as SubjectsRouter } from "./subjects/subjects.module.js";
import { router as ClassesRouter } from "./classes/classes.module.js";
import { router as StudentClasses } from "./students-classes/students-classes.module.js";
import { router as StudentsReviews } from "./students-reviews/students-reviews.module.js";
import { router as ClassesReview } from "./classes-review/classes-review.module.js";
import { router as TeachersSubjects } from "./teachers-subjects/teachers-subjects.module.js";

const api = `/${API_NAME}`;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(guard);
app.use(refreshToken);
app.use(guard);
app.use(api, AuthRouter);
app.use(api, StudentsRouter);
app.use(api, TeacherRouter);
app.use(api, CourseMapsRouter);
app.use(api, SubjectsRouter);
app.use(api, ClassesRouter);
app.use(api, StudentClasses);
app.use(api, StudentsReviews);
app.use(api, ClassesReview);
app.use(api, TeachersSubjects);
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

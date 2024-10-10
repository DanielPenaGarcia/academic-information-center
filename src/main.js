import { connection } from "./configs/database.config.js";
import { CourseMapService } from "./courses-maps/services/course-map.service.js";
import { SubjectsService } from "./subjects/services/subjects.service.js";

const subjectsService = new SubjectsService();

const corseMapService = new CourseMapService();

const createCourseMapDTO = {
    semesters: 8,
    year: 2016
}

// const courseMap = await corseMapService.createCourseMap(createCourseMapDTO);

// console.log(courseMap);

const createSubjectDTO = {
    name: "Programación 2",
    hoursPerWeek: 3,
    semester: 3,
    courseMapId: 1
}

const subject = await subjectsService.createSubject(createSubjectDTO);

console.log(subject);

connection.end();
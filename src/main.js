import { TeacherService } from "./teacher/services/teacher.service.js";

const teacherService = new TeacherService();

const teacherDTO = {
  email: "dapgpena@gmail.com",
  password: "1234",
};

const teacher = await teacherService.findTeacherByEmailAndPaswword(teacherDTO);
console.log(teacher);

const anotherTeacher = await teacherService.findTeacherByEmailAndPaswword(teacherDTO);

console.log(anotherTeacher);
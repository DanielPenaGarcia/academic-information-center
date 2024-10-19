import { TeacherService } from "./teacher/services/teacher.service.js";


const teacherService = new TeacherService();

const teacherDTO = {
  email: "dapgpena@gmail.com",
  password: "1234",
};

const newTeacher ={
  email: "example@example.com",
  password: "yourPassword123",
  academic_id: "123456",
  photo: "https://example.com/photo.jpg",
  names: "John",
  father_last_name: "Doe",
  mother_last_name: "Smith",
  curp: "ABC123456HDFLNR09"
};

const newT = await teacherService.createTeacher(newTeacher);
console.log(newT);

// const teacher = await teacherService.findTeacherByEmailAndPaswword(teacherDTO);
// console.log(teacher);

// const anotherTeacher = await teacherService.findTeacherByEmailAndPaswword(teacherDTO);

// console.log(anotherTeacher);

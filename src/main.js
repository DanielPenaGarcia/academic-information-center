import { TeacherService } from "./teacher/services/teacher.service.js";

const teacherService = new TeacherService();

const createTeacherDTO = {
  email: 'dapgpena@gmail.com',
  password: '1234',
  academic_id: '00000229185',
  photo: '',
  names: 'Daniel Armando',
  father_last_name: 'Peña',
  mother_last_name: 'García',
  curp: 'PEGD021110HSRXRNA7'
};

try{
  const teacher = await teacherService.createTeacher(createTeacherDTO);
  console.log(teacher);
} catch (error) {
  console.log(error);
}
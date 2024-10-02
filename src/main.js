import { TeacherRepository } from "./repositories/teacher.repository.js";

const teacherRepository = new TeacherRepository();

const insert = await teacherRepository.create({
  fields: ['email', 'password', 'academic_id', 'photo', 'names', 'father_last_name', 'mother_last_name', 'curp'],  // Corregido el typo en 'password'
  values: [
      ['dapgpena@gmail.com', '1234', 1, '', 'David', 'Pena', 'Gonzalez', 'PEGD021110HSRXRNA6']
  ]
});

console.log(insert);
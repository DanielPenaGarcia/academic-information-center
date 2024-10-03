import { where } from "./query-builder/condition.builder.js";
import { ReviewRepository } from "./repositories/review.repository.js";
import { TeacherRepository } from "./repositories/teacher.repository.js";
import { SubjectRepository } from "./repositories/subject-repository.js";
import { StudentRepository } from "./repositories/student.repository.js";
const teacherRepository = new TeacherRepository();

let createTeacher = await teacherRepository.create({
  fields: ['email', 'password', 'academic_id', 'photo', 'names', 'father_last_name', 'mother_last_name', 'curp'],
  values: [
    ['dapgpena@gmail.com', '1234', '00000229185', '', 'Daniel Armando', 'Peña', 'García', 'PEGD021110HSRXRNA6']
  ]
});

console.log(createTeacher);

let findTeachers = await teacherRepository.find({
  fields: ['email', 'names', 'father_last_name', 'mother_last_name'],
  conditions: where().like('email', '%@gmail%').build(),
});

console.log(findTeachers);

const teacherIdSaved = createTeacher.insertId;

let findTeacherById = await teacherRepository.findById(teacherIdSaved, {
  fields: ['email', 'names', 'father_last_name', 'mother_last_name'],
});

console.log(findTeacherById);

let updateTeachers = await teacherRepository.update({
  setValues: [{ column: 'email', value: 'dapgpena91@gmail.com' }],
  conditions: where().equal('id', teacherIdSaved).build()
});

console.log(updateTeachers);

let deleteTeachers = await teacherRepository.delete({
  conditions: where().equal('id', teacherIdSaved).build()
});

console.log(deleteTeachers);

// Tests for SubjectRepository

const subjectRepository = new SubjectRepository();

let createSubject = await subjectRepository.create({
  fields: ['name', 'hours_per_week', 'semester'],
  values: [
    ['Programación I', '8','1']
  ]
});

console.log(createSubject);


let findSubjects = await subjectRepository.find({
  fields: ['name', 'hours_per_week', 'semester'],
  conditions: where().like('name', '%Programación%').build(),
});

console.log(findSubjects);

const subjectIdSaved = createSubject.insertId;

let findSubjectById = await subjectRepository.findById(subjectIdSaved,{
  fields: ['name', 'hours_per_week', 'semester'],
});

console.log(findSubjectById);

let updateSubjects = await subjectRepository.findById(subjectIdSaved,{
  setValues: [{column: 'name', value: 'Programación II'}],
  conditions: where().equal('id', subjectIdSaved).build()
});

console.log(updateSubjects);


import { where } from "./query-builder/condition.builder.js";
import { ReviewRepository } from "./repositories/review.repository.js";
import { TeacherRepository } from "./repositories/teacher.repository.js";
import { ClassRepository } from "./repositories/class.repository.js";
import { CourseMapRepository } from "./repositories/courseMap.repository.js";

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

let findTeacherById = await teacherRepository.findById(teacherIdSaved,{
  fields: ['email', 'names', 'father_last_name', 'mother_last_name'],
});

console.log(findTeacherById);

let updateTeachers = await teacherRepository.update({
  setValues: [{column: 'email', value: 'dapgpena91@gmail.com'}],
  conditions: where().equal('id', teacherIdSaved).build()
});

console.log(updateTeachers);

let deleteTeachers = await teacherRepository.delete({
  conditions: where().equal('id', teacherIdSaved).build()
});

console.log(deleteTeachers);

const classRepository = new ClassRepository();
let createClass = await classRepository.create({
  fields: ['subject_id','teacher_id','start_time', 'description', 'duration', 'days'],
  values: [[1,1,'09:00:', 'Physics 101', 1,"Monday"]]
});

console.log(createClass);

let updateClass = await classRepository.update({
      setValues: [{column: 'start_time', value: '10:00'}],
      conditions: where().equal('id', 1).build()
});
console.log(updateClass);

let deleteClass = await classRepository.delete({conditions: where().equal('id', 1).build()})
console.log(deleteClass);

const courseMapRepository = new CourseMapRepository();

let createCourseMap = await courseMapRepository.create({
  fields: ['semesters'],
  values: [['2']]
});
console.log(createCourseMap);

let updateCourseMap = await courseMapRepository.update({
      setValues: [{column: 'semesters', value: '191028419'}],
      conditions: where().equal('id', 1).build()  
});

console.log(updateCourseMap);

let deleteCourseMap = await courseMapRepository.delete({conditions: where().equal('id', 1).build()});

console.log(deleteCourseMap);
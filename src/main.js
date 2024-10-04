import { where } from "./query-builder/condition.builder.js";
import { ReviewRepository } from "./repositories/review.repository.js";
import { TeacherRepository } from "./repositories/teacher.repository.js";
import { ClassRepository } from "./repositories/class.repository.js";
import { CourseMapRepository } from "./repositories/courseMap.repository.js";

import { SubjectRepository } from "./repositories/subject-repository.js";
import { EnrollmentPeriodRepository } from './repositories/enrollment_period.repository.js';
import {EnrollmentAppointmentRepository} from './repositories/enrollment_appointment.repository.js';
import { StudentRepository } from "./repositories/student-repository.js";
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


// Testing Enrollment Period Repository

const epr = new EnrollmentPeriodRepository();

let createEnrollmentPeriod = await epr.create({
  fields: ['start_date','end_date'],
  values: [
    [new Date().toISOString().slice(0, 19).replace('T', ' '),new Date("2024-10-12").toISOString().slice(0, 19).replace('T', ' ')]
  ]
});

console.log(createEnrollmentPeriod);

// Testing Enrollment Appointment Repository

const ear = new EnrollmentAppointmentRepository();

let createAppointmentPeriod = await ear.create({
  fields: ['student_id','enrollment_period_id','start_date_time'],
  values: [
    [1,1,new Date().toISOString().slice(0, 19).replace('T', ' ')]
  ]
});

console.log(createAppointmentPeriod);
const studentRepository = new StudentRepository();

let createStudent = await studentRepository.create({
  fields: ['email', 'password', 'academic_id', 'photo', 'names', 'father_last_name', 'mother_last_name', 'curp'],
  values: [['lubj0818@gmail.com', '1234', '0000023765', '', 'Jesus Raul', 'Luna', 'Bringas', 'LUBJ03088HSRNRSA4']
  ]
});

console.log(createStudent);


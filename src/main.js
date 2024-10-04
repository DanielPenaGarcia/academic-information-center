import { where } from "./query-builder/condition.builder.js";
import { ReviewRepository } from "./repositories/review.repository.js";
import { TeacherRepository } from "./repositories/teacher.repository.js";
import { SubjectRepository } from "./repositories/subject-repository.js";
import { EnrollmentPeriodRepository } from './repositories/enrollment_period.repository.js';
import {EnrollmentAppointmentRepository} from './repositories/enrollment_appointment.repository.js';
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


// Testing Enrollment Period Repository

const epr = new EnrollmentPeriodRepository();

let createEnrollmentPeriod = await epr.create({
  fields: ['start_date','end_date'],
  values: [
    [new Date().toISOString().slice(0, 19).replace('T', ' '),new Date("2024-10-12").toISOString().slice(0, 19).replace('T', ' ')]
  ]
});

console.log(createEnrollmentPeriod);

let periodFound = await epr.find({});
console.log('Period encontrados')
console.log(periodFound);


// Testing Enrollment Appointment Repository

const ear = new EnrollmentAppointmentRepository();

let createAppointmentPeriod = await ear.create({
  fields: ['student_id','enrollment_period_id','start_date_time'],
  values: [
    [1,1,new Date().toISOString().slice(0, 19).replace('T', ' ')]
  ]
});


console.log(`Appointment creado id: ${createAppointmentPeriod.insertId}`);


let appointmentFound = await ear.find({});
console.log('Appointment encontrados')
console.log(appointmentFound);


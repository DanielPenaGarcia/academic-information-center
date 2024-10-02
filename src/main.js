import { where } from "./query-builder/condition.builder.js";
import { JoinQuery, JoinTypes } from "./query-builder/query.js";
import { TeacherRepository } from "./repositories/teacher.repository.js";

const teacherRepository = new TeacherRepository();

teacherRepository.find({ fields: ['id','name','email'], limit: 10, offset: 0, joins: [
  { table: 'classes', type: JoinTypes.INNER, field: 'id', fields: ['name', 'description'], fieldNameReference: 'teacher_id' },
]});

/** */
// SELECT 
// teachers.id AS teachers_id, 
// teachers.name AS teachers_name, 
// teachers.email AS teachers_email, 
//classes.name AS classes_name, 
//classes.description AS classes_description
// FROM teachers INNER JOIN classes ON teachers.id = classes.teacher_id 
// WHERE teachers.id = 1  LIMIT 10 OFFSET 0
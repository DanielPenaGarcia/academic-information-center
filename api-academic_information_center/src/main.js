import { AdministratorService } from "./administrator/administrator.service.js";
import { connection } from "./configs/database.config.js";
import { CourseMapService } from "./courses-maps/services/course-map.service.js";
import { StudentService } from "./student/student.service.js";
import { SubjectsService } from "./subjects/subjects.service.js";
import { TeacherService } from "./teacher/teacher.service.js";

const subjectsService = new SubjectsService();

const corseMapService = new CourseMapService();

const administratorService = new AdministratorService();
const teacherService = new TeacherService();
const studentService = new StudentService();




let adminAuth={
    email: "pena.daniel75261@potros.itson.edu.mx",
    password:"aaia1762"
}


let teacherAuth={
    email: "pena.daniel31365@potros.itson.edu.mx",
    password:"pned3153"
}

let studentAuth={
    email: "pena.daniel13637@potros.itson.edu.mx",
    password:"npla6137"
}
let admin= await administratorService.findAdministratorByEmailAndPassword(adminAuth)
console.log(admin)
let teacher = await teacherService.findTeacherByEmailAndPaswword(teacherAuth)
console.log(teacher)
let student = await studentService.findStudentByEmailAndPassword(studentAuth)
console.log(student)



const createAdministratorDTO={
    academic_id:75261,
    names:"Peña 2",
    father_last_name:"Daniel",
    mother_last_name:"Gamez",
    curp:"DanielPeñaGamezAdmin",
}


const createTeacherDTO={
    academic_id:31365,
    names:"Peña 2",
    father_last_name:"Daniel",
    mother_last_name:"Gamez",
    curp:"DanielPeñaGamezTeacher",
}
const createStudentDTO={
    academic_id:13637,
    names:"Peña 2",
    father_last_name:"Daniel",
    mother_last_name:"Gamez",
    curp:"DanielPeñaGamezStudent",
}


connection.end();
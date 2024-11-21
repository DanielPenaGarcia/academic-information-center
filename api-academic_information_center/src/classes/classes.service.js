import { dataSource } from "../config/orm.config.js";
import { ClassSchema } from "../schemas/class.schema.js";
import { SubjectSchema } from "../schemas/subject.schema.js";
import { UserSchema } from "../schemas/user.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { days as daysOption } from "../utils/constanst/days.constants.js";

export class ClassesService {

    constructor() {
        this.classesRepository = dataSource.getRepository(ClassSchema);
        this.subjectRepository = dataSource.getRepository(SubjectSchema);
        this.teacherRepository = dataSource.getRepository(UserSchema);
    }

    async createClass({ startTime, duration, days, subjectId }) {
        const subject = await this.subjectRepository.findOne({
            where: {
                id: subjectId,
            }
        });
        if (!subject) {
            throw new BadRequestException(`Materia con id ${subjectId} no encontrada`);
        }
        const daysArray = days.split(',');
        const notDaysValid = daysArray.filter(day => !daysOption.includes(day));
        if (notDaysValid.length > 0) {
            throw new BadRequestException(`Días no válidos: ${notDaysValid.join(', ')}, los días válidos son: ${daysOption.join(', ')}`);
        }
        const classHours = (daysArray.length * duration) / 60;
        if (classHours > subject.hoursPerWeek) {
            throw new BadRequestException(`Las horas de la clase superan las horas por semana de la materia`);
        }
        const klass = this.classesRepository.create({
            startTime: startTime,
            days: days,
            duration: duration,
            subject: subject,
        });
        await this.classesRepository.save(klass);
        return klass;
    }

    async assignTeacherToClass({ classId, teacherId }) {
    
        const klass = await this.classesRepository.findOne({
            where: {
                id: classId,
            }
        });
        if (!klass) {
            throw new BadRequestException(`Clase con id ${classId} no encontrada`);
        }
        const teacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId,
                role: 'TEACHER',
            }
        });
        if (!teacher) {
            throw new BadRequestException(`Profesor con id ${teacherId} no encontrado`);
        }

        const teacherExist = klass.teacher === teacher;
        if (teacherExist) {
            throw new BadRequestException(`El profesor ya está asignado a la clase`);
        }


        klass.teacher = teacher;
        await this.classesRepository.save(klass);
        return klass;
    }
}
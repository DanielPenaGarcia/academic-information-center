import { dataSource } from "../config/orm.config.js";
import { StatusClass } from "../entities/enums/status-class.enum.js";
import { StudentClassSchema } from "../schemas/student-class.schema.js";
import { InternalServerErrorException } from "../utils/exceptions/http/internal-server-error.exception.js";
import { Like } from "typeorm";
import { NotFoundException } from "../utils/exceptions/http/not-found.exception.js";
import { readContentFile } from "../utils/functions/file.render.js";
import puppeteer from "puppeteer";
import handlebars from "handlebars";
import { ClassSchema } from "../schemas/class.schema.js";
import { StudentSchema } from "../schemas/student.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";

export class StudentsClassesService {
  constructor() {
    this.studentClasseRepository = dataSource.getRepository(StudentClassSchema);
    this.classRepository = dataSource.getRepository(ClassSchema);
    this.studentRepository = dataSource.getRepository(StudentSchema);
  }

  async studentSchedule({ academicId }) {
    try {
      const studentClasses = await this.studentClasseRepository.find({
        where: {
          student: {
            academicId: academicId,
          },
          status: StatusClass.PENDING,
        },
        relations: {
          klass: {
            subject: true,
            teacher: true,
          },
        },
        select: {
          klass: {
            id: true,
            subject: {
              name: true,
            },
            teacher: {
              names: true,
            },
            startTime: true,
            days: true,
            duration: true,
          },
        },
      });
      return studentClasses;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async printStudentSchedule({ academicId, params }) {
    const studentClasses = await this.studentClasseRepository.find({
      where: {
        student: {
          academicId: academicId,
        },
        status: StatusClass.PENDING,
      },
      relations: {
        klass: {
          subject: true,
          teacher: true,
          //TODO: Agregar salón de clases
          //classroom: true
        },
      },
      select: {
        klass: {
          id: true,
          subject: {
            name: true,
          },
          teacher: {
            names: true,
          },
          startTime: true,
          days: true,
          duration: true,
        },
      },
    });
    return await this.#createSchedulePDF({ studentClasses });
  }

  async #createSchedulePDF({ studentClasses }) {
    // Filtra las clases según los días de la semana
    const monday = studentClasses.filter((studentClass) =>
      studentClass.klass.days.includes("L")
    );
    const tuesday = studentClasses.filter((studentClass) =>
      studentClass.klass.days.includes("M")
    );
    const wednesday = studentClasses.filter((studentClass) =>
      studentClass.klass.days.includes("X")
    );
    const thursday = studentClasses.filter((studentClass) =>
      studentClass.klass.days.includes("J")
    );
    const friday = studentClasses.filter((studentClass) =>
      studentClass.klass.days.includes("V")
    );
    const saturday = studentClasses.filter((studentClass) =>
      studentClass.klass.days.includes("S")
    );
    const sunday = studentClasses.filter((studentClass) =>
      studentClass.klass.days.includes("D")
    );

    // Crea el horario
    const schedule = {
      monday: this.#createDaySchedule({ studentClasses: monday, day: "Lunes" }),
      tuesday: this.#createDaySchedule({
        studentClasses: tuesday,
        day: "Martes",
      }),
      wednesday: this.#createDaySchedule({
        studentClasses: wednesday,
        day: "Miércoles",
      }),
      thursday: this.#createDaySchedule({
        studentClasses: thursday,
        day: "Jueves",
      }),
      friday: this.#createDaySchedule({
        studentClasses: friday,
        day: "Viernes",
      }),
      saturday: this.#createDaySchedule({
        studentClasses: saturday,
        day: "Sábado",
      }),
      sunday: this.#createDaySchedule({
        studentClasses: sunday,
        day: "Domingo",
      }),
    };

    // Crear el contexto para el PDF
    const context = {
      nombre: "Mi pdf",
      items: [
        schedule.monday,
        schedule.tuesday,
        schedule.wednesday,
        schedule.thursday,
        schedule.friday,
        schedule.saturday,
        schedule.sunday,
      ],
    };
    const html = await readContentFile(
      "../../assets/templates/schedule.template.html"
    );
    const template = handlebars.compile(html);
    const hbs = template(context);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(hbs);
    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
    });
    await browser.close();
    return Buffer.from(pdf);
  }

  #createDaySchedule({ studentClasses, day }) {
    const schedule = {
      day: day,
      classes: [],
    };

    studentClasses.forEach((studentClass) => {
      const duration = studentClass.klass.duration || 0;
      const startTime = studentClass.klass.startTime.split(":") || [0, 0];
      const startHours = parseInt(startTime[0]);
      const startMinutes = parseInt(startTime[1]);
      const totalMinutes = startMinutes + (duration % 60);
      const endHours =
        startHours + Math.floor(duration / 60) + Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      const time = `${startHours.toString().padStart(2, "0")}:${startMinutes
        .toString()
        .padStart(2, "0")} - ${endHours
        .toString()
        .padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;

      const subject = {
        name: studentClass.klass.subject.name,
      };

      const teacher = {
        name: studentClass.klass.teacher
          ? studentClass.klass.teacher.names
          : "Sin asignar",
      };

      // Agregar la clase al horario
      schedule.classes.push({
        time,
        subject,
        teacher,
        // Aquí puedes agregar el aula si es necesario
        // classroom: studentClass.klass.classroom
      });
    });

    return schedule;
  }

  async getStudentClassesByStudentId({ academicId }, pageable, { className }) {
    try {
      const studentClasses = await this.studentClasseRepository.findAndCount({
        where: {
          student: {
            academicId: academicId,
          },
          klass: {
            subject: {
              name: className ? Like(`%${className}%`) : undefined,
            },
          },
          status: StatusClass.PENDING,
        },
        relations: {
          klass: {
            subject: true,
          },
        },
        select: {
          id: true,
          klass: {
            id: true,
            subject: {
              name: true,
            },
            startTime: true,
            days: true,
          },
        },
        take: pageable.limit,
        skip: pageable.offset,
      });
      return {
        studentClasses: studentClasses[0],
        totalElements: studentClasses[1],
        totalPages: Math.ceil(studentClasses[1] / pageable.limit),
        currentPage: pageable.page,
      };
    } catch (error) {
      throw new InternalServerErrorException("Can not find student class");
    }
  }

  async dropClass({ academicId, studentClassId }) {
    try {
      const studentClass = await this.studentClasseRepository.findOne({
        where: {
          id: studentClassId,
          student: {
            academicId: academicId,
          },
        },
        relations: {
          student: true,
          klass: {
            subject: true,
          },
        },
        select: {
          id: true,
          student: {
            academicId: true,
          },
          klass: {
            subject: {
              name: true,
            },
            days: true,
            duration: true,
          },
          status: true,
        },
      });

      if (!studentClass) {
        throw new NotFoundException("Class of the Student not found");
      }

      const studentClassDeleted = await this.studentClasseRepository.delete({
        id: studentClassId,
      });

      if (studentClassDeleted.affected == 0) {
        return {};
      }
      return studentClass;
    } catch (error) {
      throw new InternalServerErrorException("Can not drop class");
    }
  }

  async getStudentClassesToReview({academicId}){

    if(!academicId){
      throw new BadRequestException(`Invalid academicId`)
    }
    //TODO el paginado no funciona
    try{
      const results = await this.studentClasseRepository
      .createQueryBuilder("sc")
      .innerJoinAndSelect("sc.student", "student")
      .innerJoinAndSelect("sc.klass", "klass")
      .innerJoinAndSelect("klass.teacher", "teacher")
      .innerJoinAndSelect("klass.subject", "subject")
      .leftJoin("class_reviews", "review", "review.klass_id = klass.id")
      .select([
          "teacher.names AS teacher_name",
          "teacher.fatherLastName AS teacher_father_last_name",
          "teacher.motherLastName AS teacher_mother_lastName",
          "klass.id AS classId",
          "subject.name AS subject_name",
          "klass.days",
          "klass.startTime",
          "klass.duration",
          "sc.status AS status",
          "student.academicId AS academic_id",
          "student.names AS student_name",
          "student.fatherLastName AS student_father_lastName",
          "student.motherLastName AS student_mother_lastName",
      ])
      .addSelect("CASE WHEN review.id IS NOT NULL THEN true ELSE false END", "hasReview")
      .where("student.academicId = :academicId AND sc.status = 'PENDING'", { academicId })
      .getRawMany();

  return results;

    }catch(error){
      throw new InternalServerErrorException("Could not find student class")
    }

  }

  async gradeStudent({ academicId, classId, grade }) {
    if (!grade) {
      throw new Error("Unassigned grade");
    }
    if (grade < 0 || grade > 10) {
      throw new Error("Invalid grade");
    }
    const classCondition = where().equal("id", classId).build();
    console.log(classCondition);
    const classDTO = await this.repositoryClass.findOne({
      conditions: classCondition,
    });
    if (!classDTO) {
      throw new Error("Class not found");
    }
    const classRef = classDtoToEntityMapper(classDTO);
    const studentCondition = where().equal("academic_id", academicId).build();
    console.log(studentCondition);
    const studentDTO = await this.repositoryStudent.findOne({
      conditions: studentCondition,
    });
    if (!studentDTO) {
      throw new Error("Student not found");
    }
    const student = classDtoToEntityMapper(studentDTO);

    const studentClassCondition = where()
      .equal("student_id", student.id)
      .and()
      .equal("class_id", classId)
      .build();
    console.log(studentClassCondition);

    const studentClass = await this.repositoryStudentClasses.findOne({
      condition: studentClassCondition,
    });

    if (!studentClass) {
      throw new Error("The student is not enrolled in said class");
    }

    const values = [];
    values.push({
      column: "grade",
      value: grade,
    });
    const status = this.#getStatusByGrade({ grade });
    values.push({
      column: "status",
      value: status,
    });

    const conditionUpdate = where()
      .equal("student_id", student.id)
      .and()
      .equal("class_id", classId)
      .build();
    const result = await this.repositoryStudentClasses.update({
      setValues: values,
      condition: conditionUpdate,
    });
    return { classRef, student, grade, status };
  }

  #getStatusByGrade({ grade }) {
    if (grade >= 70) {
      return StatusClass.APPROVED;
    }
    return StatusClass.REJECTED;
  }

  async studentsInClass({ classId, pageable }) {
    const klass = await this.classRepository.findOne({
      where: {
        id: classId,
      },
    });
    if (!klass) {
      throw new NotFoundException("Class not found");
    }
    const studentsInClass = await this.studentClasseRepository.findAndCount({
      where: {
        klass: {
          id: classId,
        },
      },
      relations: {
        student: true,
        klass: true,
      },
      select: {
        student: {
          id: true,
          academicId: true,
          names: true,
          fatherLastName: true,
          motherLastName: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
      },
      take: pageable.limit,
      skip: pageable.offset,
    });
    return {
      students: studentsInClass[0],
      totalElements: studentsInClass[1],
      totalPages: Math.ceil(studentsInClass[1] / pageable.limit),
      currentPage: pageable.page,
    };
  }

  async findStudentInClass({ academicId, classId }) {
    const student = await this.studentClasseRepository.findOne({
      where: {
        student: {
          academicId: academicId,
        },
      },
    });
    if (!student) {
      throw new NotFoundException("Student not found in class");
    }
    const klass = await this.classRepository.findOne({
      where: {
        id: classId,
      },
    });
    if (!klass) {
      throw new NotFoundException("Class not found");
    }
    const studentInClass = await this.studentClasseRepository.findOne({
      where: {
        student: {
          academicId: academicId,
        },
        klass: {
          id: classId,
        },
      },
      relations: {
        student: true,
        klass: true,
      },
      select: {
        id: true,
        student: {
          id: true,
          academicId: true,
          names: true,
          fatherLastName: true,
          motherLastName: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
        klass: {
          id: true,
          subject: {
            name: true,
          },
          startTime: true,
          days: true,
          duration: true,
        },
        grade: true,
        feedback: true,
        status: true,
      }
    });
    return studentInClass;
  }

  async gradeStudent({ academicId, classId, grade, feedback }) {
    if (!grade) {
      throw new BadRequestException("Unassigned grade");
    }
    if (grade < 0 || grade > 100) {
      throw new BadRequestException("Invalid grade");
    }

    const studentClass = await this.studentClasseRepository.findOne({
      where: {
        student: {
          academicId: academicId,
        },
        klass: {
          id: classId,
        },
      },
      relations: {
        student: true,
        klass: true,
      },
      select: {
        id: true,
        student: {
          id: true,
          academicId: true,
          names: true,
          fatherLastName: true,
          motherLastName: true,
          updatedAt: true,
          role: true,
        },
        klass: {
          id: true,
          subject: {
            name: true,
          },
          startTime: true,
          days: true,
          duration: true,
        },
        grade: true,
        feedback: true,
        status: true,
      }
    });

    if (!studentClass) {
      throw new NotFoundException("Student not found in class");
    }

    studentClass.grade = grade;
    studentClass.feedback = feedback;
    studentClass.status = this.#getStatusByGrade({ grade });

    const response  = await this.studentClasseRepository.update({ id: studentClass.id }, { grade: grade, status: studentClass.status, feedback: feedback });
    if (response.affected == 0) {
      throw new InternalServerErrorException("Can not grade student");
    }
    return studentClass;
  }
}

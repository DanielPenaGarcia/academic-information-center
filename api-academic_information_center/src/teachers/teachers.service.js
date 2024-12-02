import { dataSource } from "../config/orm.config.js";
import { TeacherSchema } from "../schemas/teacher.schema.js";
import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";
import { InternalServerErrorException } from "../utils/exceptions/http/internal-server-error.exception.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { UserSchema } from "../schemas/user.schema.js";
import { NotFoundException } from "../utils/exceptions/http/not-found.exception.js";
import { ClassSchema } from "../schemas/class.schema.js";

export class TeachersService {
  constructor() {
    this.teachersRepository = dataSource.getRepository(TeacherSchema);
    this.classesRepository = dataSource.getRepository(ClassSchema);
  }

  async getTeacherInfoByAcademicId({ academicId }) {
    const teacherFound = await this.teachersRepository.findOneBy({
      academicId: academicId,
    });
    if (!teacherFound) {
      throw new NotFoundException("Teacher not found");
    }
    delete teacherFound.password;
    return teacherFound;
  }

  async createTeacher({ names, fatherLastName, motherLastName }) {
    //TODO: Agregar photo a los values cuando se reciba de la petición
    let teacherCreated = null;
    await dataSource.transaction(async (transactionalEntityManager) => {
      //Transaction Implementation
      try {
        const teacher = {
          names: names,
          fatherLastName: fatherLastName,
          motherLastName: motherLastName,
          password: "",
        };
        // transactionalEntityManager.create(TeacherSchema,{}) Para armar el objeto
        teacherCreated = await transactionalEntityManager.save(
          TeacherSchema,
          teacher
        );

        teacherCreated = await transactionalEntityManager.findOneBy(
          TeacherSchema,
          { id: teacherCreated.id }
        );

        const emailCreated = createAcademicEmail({
          name: teacherCreated.names,
          fatherLastName: teacherCreated.fatherLastName,
          academicId: teacherCreated.academicId,
        });

        const passwordCreated = createAcademicPassword({
          name: teacherCreated.names,
          fatherLastName: teacherCreated.fatherLastName,
          academicId: teacherCreated.academicId,
        });

        teacherCreated.email = emailCreated;
        teacherCreated.password = passwordCreated;

        await transactionalEntityManager.save(TeacherSchema, teacherCreated);
      } catch (error) {
        throw new InternalServerErrorException("Error on create Teacher");
      }
    });
    return teacherCreated;
  }

  async updateTeacher({
    academicId,
    names,
    fatherLastName,
    motherLastName,
    password,
    curp,
    photo,
  }) {
    //TODO: UPDATE PHOTO
    const updateData = {};

    if (!academicId) {
      throw new BadRequestException("Invalid academic Id");
    }

    if (names) {
      updateData.names = names;
    }

    if (fatherLastName) {
      updateData.fatherLastName = fatherLastName;
    }

    if (motherLastName) {
      updateData.motherLastName = motherLastName;
    }

    if (password) {
      updateData.password = password;
    }

    if (curp) {
      updateData.curp = curp;
    }

    if (photo) {
      updateData.photo = photo;
    }

    if (Object.keys(updateData).length == 0) {
      throw new BadRequestException(
        "Empty values, there are no values to update"
      );
    }

    const response = await this.teachersRepository.update(
      { academicId: academicId },
      updateData
    );
    if (response.affected == 0) {
      throw new NotFoundException("There were no updated teacher");
    }
    const teacherUpdated = await this.teachersRepository.findOneBy({
      academicId: academicId,
    });
    return teacherUpdated;
  }

  async findTeacherClassesByAcademicId({ academicId, pageable }) {
    const teacher = await this.teachersRepository.findOne({
      where: {
        academicId: academicId
      },
    });
    if (!teacher) {
      throw new BadRequestException(`Teacher with academic id ${academicId} not found`);
    }
    const classes = await this.classesRepository.findAndCount({
      where: {
        teacher: {
          academicId: academicId
        },
      },
      relations: {
        subject: true,
      },
      select: {
        id: true,
        days: true,
        startTime: true,
        duration: true,
        classroom: true,
        description: true,
        subject: {
          id: true,
          name: true,
        },
      },
      take: pageable.limit,
      skip: pageable.offset,
    });
    return {
      classes: classes[0],
      totalElements: classes[1],
      totalPages: Math.ceil(classes[1] / pageable.limit),
      currentPage: pageable.page,
    };
  }
}

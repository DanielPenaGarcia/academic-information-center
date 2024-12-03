import { dataSource } from "../config/orm.config.js";
import { ClassReviewSchema } from "../schemas/class-review.schema.js";
import { ClassSchema } from "../schemas/class.schema.js";
import { StudentClassSchema } from "../schemas/student-class.schema.js";
import { StudentSchema } from "../schemas/student.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { NotFoundException } from "../utils/exceptions/http/not-found.exception.js";

export class ClassesReviewService {
  constructor() {
    this.classReviewRepository = dataSource.getRepository(ClassReviewSchema);
    this.studentRepository = dataSource.getRepository(StudentSchema);
    this.classRepository = dataSource.getRepository(ClassSchema);
    this.studentClassRepository = dataSource.getRepository(StudentClassSchema);
  }

  async generateClassReview({ comment, academicId, classId }) {
    if (!comment) {
      throw BadRequestException("Invalid comment");
    }

    const studentFound = await this.studentRepository.findOne({
      where: {
        academicId: academicId,
      },
    });

    if (!studentFound) {
      throw new NotFoundException(
        `Student with academic id: ${academicId} not found`
      );
    }

    const classFound = await this.classRepository.findOne({
      where: {
        id: classId,
      },
      relations: {
        subject: true,
      },
    });

    if (!classFound) {
      throw new NotFoundException(`Class not create review found`);
    }

    const studentClassFound = await this.studentClassRepository.findOneBy({
      student: {
        id: studentFound.id,
      },
      klass: {
        id: classFound.id,
      },
    });

    if (!studentClassFound) {
      throw new NotFoundException(
        `Student with academic id ${academicId} is not enrolled in the class ${classFound.subject.name}`
      );
    }

    const review = this.classReviewRepository.create({
      comment: comment,
      klass: {
        id: classFound.id,
      },
      student: {
        id: studentFound.id,
      },
    });

    const reviewCreated = await this.classReviewRepository.save(review);

    if (!reviewCreated) {
      throw new BadRequestException(`Can not register a review to the class`);
    }

    return {
      class: classFound.subject.name,
      student: studentFound.academicId,
      comment: comment,
    };
  }

  async findReviewByClassId({ classId }) {
    const classFound = await this.classRepository.findOne({
      where: {
        id: classId,
      },
      relations: {
        subject: true,
      },
    });
    if (!classFound) {
      throw new NotFoundException(`Class not found`);
    }
    const reviews = await this.classReviewRepository.find({
      where: {
        klass: {
          id: classFound.id,
        },
      }
    });
    return {
      reviews: reviews
    }
  }
}

import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { dataSource } from "../config/orm.config.js";
import { EnrollmentAppoinmentSchema } from "../schemas/enrollment-appointment.schema.js";
import { EnrollmentPeriodSchema } from "../schemas/enrollment-period.schema.js";

export class EnrollmentAppoinmentsService {
  constructor() {
    this.enrollmentAppoinmentRepository = dataSource.getRepository(
        EnrollmentAppoinmentSchema
    );
    this.enrollmentPeriodRepository = dataSource.getRepository(
      EnrollmentPeriodSchema
    );
  }

  async findEnrollmentAppoinmentsByAcademicId({ academicId }) {
    const currentDate = new Date();

    const period = await this.enrollmentPeriodRepository.findOne({
      where: {
        startDate: LessThanOrEqual(currentDate),
        endDate: MoreThanOrEqual(currentDate),
      },
      select: { id: true },
    });
    if (!period) {
      throw new Error("No hay un período activo en este momento.");
    }
    const enrollmentAppoinments =
      await this.enrollmentAppoinmentRepository.find({
        where: {
          enrollmentPeriod: {
            id: period.id,
          },
          student: {
            academicId,
          },
        },
        relations: {
            enrollmentPeriod: true,
        },
        select: {
            enrollmentPeriod: {
                id: true,
                name: true,
            },
            id: true,
            startDateTime: true,
        }
      });

    return enrollmentAppoinments;
  }
}

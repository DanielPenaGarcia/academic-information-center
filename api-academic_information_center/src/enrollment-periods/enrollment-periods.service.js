import { dataSource } from "../config/orm.config.js";
import { EnrollmentPeriodSchema } from "../schemas/enrollment-period.schema.js";

export class EnrollmentPeriodsService {
    constructor() {
        this.enrollmentPeriodRepository = dataSource.getRepository(EnrollmentPeriodSchema);
    }

    async createEnrollmentPeriod({name, startDate, endDate}) {
        const enrollmentPeriod = this.enrollmentPeriodRepository.create({
            name: name,
            startDate: startDate,
            endDate: endDate
        });
        await this.enrollmentPeriodRepository.save(enrollmentPeriod);
        return enrollmentPeriod;
    }
}
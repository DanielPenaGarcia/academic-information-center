import { EnrollmentPeriodsService } from "./enrollment-periods.service.js";

export class EnrollmentPeriodsController {
    constructor() {
        this.enrollmentPeriodsService = new EnrollmentPeriodsService();
    }

    async postCreateEnrollmentPeriod(req, res, next) {
        try {
            const { name, startDate, endDate } = req.body;
            const enrollmentPeriod = await this.enrollmentPeriodsService.createEnrollmentPeriod({ name, startDate, endDate });
            res.status(201).json(enrollmentPeriod);
        } catch (error) {
            next(error);
        }
    }
}
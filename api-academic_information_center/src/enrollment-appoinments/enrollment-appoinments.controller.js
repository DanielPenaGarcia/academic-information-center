import { EnrollmentAppoinmentsService } from "./enrollment-appoinments.service.js";

export class EnrollmentAppoinmentsController {
    constructor() {
        this.enrollmentAppoinmentsService = new EnrollmentAppoinmentsService();
    }

    async findEnrollmentAppoinmentsByAcademicId(req, res, next) {
        try {
            const { academicId } = req.user;
            const enrollmentAppoinments = await this.enrollmentAppoinmentsService.findEnrollmentAppoinmentsByAcademicId({ academicId });
            res.status(200).json(enrollmentAppoinments);
        } catch (error) {
            next(error);
        }
    }
}
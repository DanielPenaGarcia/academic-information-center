import { CourseMapsService } from "./course-maps.service.js";

export class CourseMapController {

    constructor() {
        this.courseMapsService = new CourseMapsService();
    }

    async createCourseMap(req, res, next) {
        try {
            const { semesters, year } = req.body;
            const result = await this.courseMapsService.createCourseMap({ semesters, year });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

}
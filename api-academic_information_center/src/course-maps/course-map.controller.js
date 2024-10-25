import { CourseMapsService } from "./course-maps.service.js";

export class CourseMapController {

    constructor() {
        this.courseMapsService = new CourseMapsService();
    }

    async createCourseMap(req, res) {
        try {
            const { semesters, year } = req.body;
            const result = await this.courseMapsService.createCourseMap({ semesters, year });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}
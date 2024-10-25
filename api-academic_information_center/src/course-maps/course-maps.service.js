import { BusinessException } from "../utils/exceptions/business.exception.js";
import { courseMapDtoToEntityMapper } from "../utils/mappers/course-map-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class CourseMapsService {
    constructor() {
        this.courseMapsRepository = new Repository(RepositoryTable.COURSEMAP);
    }

    async createCourseMap({ semesters, year }){
        const courseMaps = await this.findCourseMapsByYear({ year });
        if(courseMaps.length > 0){
            throw new BusinessException('El mapa curricular ya existe para el año proporcionado');
        }
        const fields = ['semesters', 'year'];
        const values = [[semesters, year]];
        const result = await this.courseMapsRepository.create({
            fields: fields,
            values: values
        });
        if(result.affectedRows === 0){
            throw new Error('Error creating course map');
        }
        const courseMapDTO = await this.courseMapsRepository.findOneById(result.insertId);
        const courseMap = courseMapDtoToEntityMapper(courseMapDTO);
        return courseMap;
    }

    async findCourseMapsByYear({ year }) {
        const condition = where().equal('year', year).build();
        const courseMapsDTOs = await this.courseMapsRepository.find({ conditions: condition });
        const courseMap = courseMapsDTOs.map(courseMapDtoToEntityMapper);
        return courseMap;
    }
}
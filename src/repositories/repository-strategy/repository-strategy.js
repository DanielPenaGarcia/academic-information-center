import { RepositoryStrategyException } from "../../utils/exceptions/repository-strategy.exception.js";

export class RepositoryStrategy {
    constructor(){}

    async find(object) {
        throw new RepositoryStrategyException('Method must be implemented');
    }

    async findById(id, object) {
        throw new RepositoryStrategyException('Method must be implemented');
    }

    async create(object) {
        throw new RepositoryStrategyException('Method must be implemented');
    }

    async update(object) {
        throw new RepositoryStrategyException('Method must be implemented');
    }

    async delete(object) {
        throw new RepositoryStrategyException('Method must be implemented');
    }
}

export const RepoStrategy = Object.freeze({
    TEACHER: 'teachers',
    REVIEW: 'reviews',
    STUDENT: 'students',
    ENROLLMENT_PERIOD: 'enrollment_period',
    ENROLLMENT_APPOINTMENT: 'enrollment_appoinment'

});
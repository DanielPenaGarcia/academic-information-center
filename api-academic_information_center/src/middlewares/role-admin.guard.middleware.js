import { role as userRole } from '../entities/enums/role.enum.js';
import { ForbiddenException } from '../utils/exceptions/http/forbidden.exception.js';

export const roleAdminGuard = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== userRole.ADMIN) {
            throw new ForbiddenException();
        }
        next();
    } catch (error) {
        next(error);
    }
};
import { Administrator } from "../../entities/administrator.entity.js";
import { UserRole } from "../../entities/enums/roles.enum.js";
import { Student } from "../../entities/student.entity.js";
import { Teacher } from "../../entities/teacher.entity.js";

export function getUserRole(user) {
    if (user instanceof Student) {
        return UserRole.STUDENT;
    }
    if (user instanceof Teacher) {
        return UserRole.TEACHER;
    }
    if (user instanceof Administrator) {
        return UserRole.ADMINISTRATOR;
    }
    return null;
}
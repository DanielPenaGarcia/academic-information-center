import { UserRole } from "../entities/enums/roles.enum.js";
import { generateRefreshToken } from "../utils/functions/generate-refresh-token.function.js";
import { generateToken } from "../utils/functions/generate-token.function.js";
import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async postLoginTeacher(req, res, next) {
    try {
      const { academicId, password } = req.body;
      const teacher = await this.authService.teacherLogin({
        academicId,
        password,
      });
      const token = generateToken({ academicId: teacher.academicId, role: UserRole.TEACHER });
      return res.status(200).json({ token, ...teacher });
    } catch (error) {
      next(error);
    }
  }

  async postLoginStudent(req, res, next) {
    try {
      const { academicId, password } = req.body;
      const student = await this.authService.studentLogin({
        academicId,
        password,
      });
      const token = generateToken({ academicId: student.academicId, role: UserRole.STUDENT });
      return res.status(200).json({ token, ...student });
    } catch (error) {
      next(error);
    }
  }

  async postLoginAdministrator(req, res, next) {
    try {
      const { academicId, password } = req.body;
      const administrator = await this.authService.administratorLogin({
        academicId,
        password,
      });
      const token = generateToken({ academicId: administrator.academicId, role: UserRole.ADMINISTRATOR });
      return res.status(200).json({ token, ...administrator });
    } catch (error) {
      next(error);
    }
  }
}

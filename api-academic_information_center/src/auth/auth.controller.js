import { environment } from "../environments/environment.js";
import { REFRESH_TOKEN_COOKIE } from "../utils/constanst/refresh-token-cookie.constant.js";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { TOKEN_EXPIRES } from "../utils/constanst/token-expires.constant.js";
import { TOKEN_REFRESH_EXPIRES } from "../utils/constanst/token-refresh-expires.js";
import { NotFoundException } from "../utils/exceptions/not-found-exception.js";
import { generateRefreshToken } from "../utils/functions/generate-refresh-token.function.js";
import { generateToken } from "../utils/functions/generate-token.function.js";
import { getUserRole } from "../utils/functions/get-user-role.function.js";
import { AuthService } from "./auth.service.js";
import jwt from "jsonwebtoken";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async getUser(req, res, next) {
    try {
      const { academicId, token } = req.user;
      const user = await this.authService.findUserByAcademicId({ academicId });
      if (!user) {
        throw new NotFoundException("User is not logged in");
      }
      user.role = getUserRole(user);
      user.token = token;
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteLogout(req, res) {
    res.clearCookie(TOKEN_COOKIE);
    res.clearCookie(REFRESH_TOKEN_COOKIE);
    return res.status(200).send({});
  }

  async postLoginTeacher(req, res, next) {
    try {
      const { email, password } = req.body;
      const teacher = await this.authService.teacherLogin({ email, password });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }
      const role = getUserRole(teacher);
      const token = generateToken({ academicId: teacher.academicId, role });
      res.cookie(TOKEN_COOKIE, token);
      const refreshToken = generateRefreshToken({
        academicId: teacher.academicId,
        role,
      });
      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken);
      teacher.role = role;
      return res.status(200).send(teacher);
    } catch (error) {
      next(error);
    }
  }

  async postLoginStudent(req, res, next) {
    try {
      const { email, password } = req.body;
      const student = await this.authService.studentLogin({ email, password });
      if (!student) {
        throw new NotFoundException("Student not found");
      }
      const role = getUserRole(student);
      const token = generateToken({ academicId: student.academicId, role });
      res.cookie(TOKEN_COOKIE, token);
      const refreshToken = generateRefreshToken({
        academicId: student.academicId,
        role,
      });
      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken);
      student.role = role;
      return res.status(200).send(student);
    } catch (error) {
      next(error);
    }
  }

  async postLoginAdministrator(req, res, next) {
    try {
      const { email, password } = req.body;
      const administrator = await this.authService.administratorLogin({
        email,
        password,
      });
      if (!administrator) {
        throw new NotFoundException("Administrator not found");
      }
      const role = getUserRole(administrator);
      const token = generateToken({
        academicId: administrator.academicId,
        role,
      });
      res.cookie(TOKEN_COOKIE, token);
      const refreshToken = generateRefreshToken({
        academicId: administrator.academicId,
        role,
      });
      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken);
      administrator.role = role;
      return res.status(200).send(administrator);
    } catch (error) {
      next(error);
    }
  }
}

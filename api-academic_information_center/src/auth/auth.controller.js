import { environment } from "../environments/environment.js";
import { REFRESH_TOKEN_COOKIE } from "../utils/constanst/refresh-token-cookie.constant.js";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { TOKEN_EXPIRES } from "../utils/constanst/token-expires.constant.js";
import { TOKEN_REFRESH_EXPIRES } from "../utils/constanst/token-refresh-expires.js";
import { generateRefreshToken } from "../utils/functions/generate-refresh-token.function.js";
import { generateToken } from "../utils/functions/generate-token.function.js";
import { getUserRole } from "../utils/functions/get-user-role.function.js";
import { AuthService } from "./auth.service.js";
import jwt from "jsonwebtoken";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async getUser(req, res) {
    const { academicId, token } = req.user;
    const user = await this.authService.findUserByAcademicId({ academicId });
    if (!user) {
      return res.status(404).send({});
    }
    user.role = getUserRole(user);
    user.token = token;
    return res.status(200).send(user);
  }

  async deleteLogout(req, res) {
    res.clearCookie(TOKEN_COOKIE);
    res.clearCookie(REFRESH_TOKEN_COOKIE);
    return res.status(200).send({});
  }

  async postLoginTeacher(req, res) {
    const { email, password } = req.body;
    const teacher = await this.authService.teacherLogin({ email, password });
    if (!teacher) {
      return res.status(404).send("Teacher not found");
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
  }

  async postLoginStudent(req, res) {
    const { email, password } = req.body;
    const student = await this.authService.studentLogin({ email, password });
    if (!student) {
      return res.status(404).send("Student not found");
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
    return res.status(200).send(data);
  }

  async postLoginAdministrator(req, res) {
    const { email, password } = req.body;
    const administrator = await this.authService.administratorLogin({
      email,
      password,
    });
    if (!administrator) {
      return res.status(404).send("Administrator not found");
    }
    const role = getUserRole(administrator);
    const token = generateToken({ academicId: administrator.academicId, role });
    res.cookie(TOKEN_COOKIE, token);
    const refreshToken = generateRefreshToken({
      academicId: administrator.academicId,
      role,
    });
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken);
    administrator.role = role;
    return res.status(200).send(administrator);
  }
}

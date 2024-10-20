import { environment } from "../environments/environment.js";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { getUserRole } from "../utils/functions/get-user-role.function.js";
import { AuthService } from "./auth.service.js";
import jwt from "jsonwebtoken";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.sessionTimeout = 60;
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
    return res.status(200).send({});
  }

  async postLoginTeacher(req, res) {
    const { email, password } = req.body;
    const teacher = await this.authService.teacherLogin({ email, password });
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }
    const token = this.#generateToken({
      academicId: teacher.academicId,
      role: getUserRole(teacher),
    });
    const data = { token: token, user: teacher };
    return res.status(200).send(data);
  }

  async postLoginStudent(req, res) {
    const { email, password } = req.body;
    const student = await this.authService.studentLogin({ email, password });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    const token = this.#generateToken({
      academicId: student.academicId,
      role: getUserRole(student),
    });
    const data = { token: token, user: student };
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
    const token = this.#generateToken({
      academicId: administrator.academicId,
      role: getUserRole(administrator),
    });
    const data = { token: token, user: administrator };
    return res.status(200).send(data);
  }

  #generateToken({ academicId, role, secretKey = environment.secretTokenKey, expiresIn = this.sessionTimeout }) {
    return jwt.sign({ academicId, role }, secretKey, { expiresIn: expiresIn });
  }
}

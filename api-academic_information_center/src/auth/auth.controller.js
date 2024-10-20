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

  async logout(req, res) {
    res.clearCookie(TOKEN_COOKIE);
    return res.status(200).send({});
  }

  async teacherLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const teacher = await this.authService.teacherLogin({ email, password });
    if (!teacher) {
      return res.status(401).send("Invalid email or password");
    }
    const role = getUserRole(teacher);
    const token = this.#generateToken({
      academicId: teacher.academicId,
      role,
      secretKey: environment.secretTokenKey,
      expiresIn: this.sessionTimeout,
    });
    res.cookie(TOKEN_COOKIE, token, {
      httpOnly: true,
    });
    return res.status(200).send(teacher);
  }

  async studentLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const student = await this.authService.studentLogin({ email, password });
    if (!student) {
      return res.status(401).send("Invalid email or password");
    }
    const role = getUserRole(student);
    const token = this.#generateToken({
      academicId: student.academicId,
      role,
      secretKey: environment.secretTokenKey,
      expiresIn: this.sessionTimeout,
    });
    res.cookie(TOKEN_COOKIE, token, {
      httpOnly: true,
    });
    return res.status(200).send(student);
  }

  async administratorLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const administrator = await this.authService.administratorLogin({
      email,
      password,
    });
    if (!administrator) {
      return res.status(401).send("Invalid email or password");
    }
    const role = getUserRole(administrator);
    const token = this.#generateToken({
      academicId: administrator.academicId,
      role,
      secretKey: environment.secretTokenKey,
      expiresIn: this.sessionTimeout,
    });
    res.cookie(TOKEN_COOKIE, token, {
      httpOnly: true,
    });
    return res.status(200).send(administrator);
  }

  #generateToken({ academicId, role, secretKey, expiresIn }) {
    return jwt.sign({ academicId, role }, secretKey, { expiresIn });
}

}

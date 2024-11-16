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

  async postLoging(req, res, next) {
    try {
      const { academicId, password } = req.body;
      const administrator = await this.authService.login({
        academicId: academicId,
        password: password,
      });
      const token = generateToken({
        academicId: administrator.academic.academicId,
        role: "ADMINISTRATOR",
      });
      return res.status(200).json({ token, ...administrator });
    } catch (error) {
      next(error);
    }
  }
}

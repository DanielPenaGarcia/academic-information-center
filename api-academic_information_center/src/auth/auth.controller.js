import { TOKEN_EXPIRES } from "../utils/constanst/token-expires.constant.js";
import { generateToken } from "../utils/functions/generate-token.function.js";
import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async postLoging(req, res, next) {
    try {
      const userReq = req.user;
      const { academicId, password } = req.body;
      const user = await this.authService.login({ academicId, password });
      const token = generateToken({academicId: user.academicId, role: user.role, expiresIn: TOKEN_EXPIRES});
      res.status(200).json({ token, user });
    } catch (error) {
      next(error);
    }
  }
}

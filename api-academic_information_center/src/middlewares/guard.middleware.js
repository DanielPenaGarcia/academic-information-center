import { environment } from "../environments/environment.js";
import jwt from "jsonwebtoken";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { API_NAME } from "../utils/constanst/api-name.constant.js";
import { byPass } from "../utils/functions/bypass.function.js";
import { logger } from "../config/log.config.js";

export const guard = (req, res, next) => {
  try {
    const isPass = byPass(req);
    if (isPass) {
      return next();
    }
    const token = tokenFromCookie(req);
    if (!token) {
      return next(new UnauthorizedException("Unauthorized"))
    }
    jwt.verify(token, environment.secretTokenKey, (error, decoded) => {
      if (error) {
        return next(new UnauthorizedException("Unauthorized"))
      }
      req.user = decoded;
    });
    next();
  } catch (error) {
    return next(new UnauthorizedException("Unauthorized"))
  }
};

const tokenFromCookie = (req) => {
  return req.cookies[TOKEN_COOKIE];
};
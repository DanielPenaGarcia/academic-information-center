import { environment } from "../environments/environment.js";
import jwt from "jsonwebtoken";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { API_NAME } from "../utils/constanst/api-name.constant.js";
import { byPass } from "../utils/functions/bypass.function.js";
import { logger } from "../config/log.config.js";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception.js";

export const guard = (req, res, next) => {
  try {
    const isPass = byPass(req);
    if (isPass) {
      return next();
    }
    const token = tokenFromCookie(req);
    if (!token) {
      return next(new UnauthorizedException('Iniciar sesión es requerido'));
    }
    jwt.verify(token, environment.secretTokenKey, (error, decoded) => {
      if (error) {
        throw new UnauthorizedException('El token con el que intenta acceder no es válido');
      }
      req.user = decoded;
    });
    next();
  } catch (error) {
    return next(error);
  }
};

const tokenFromCookie = (req) => {
  return req.cookies[TOKEN_COOKIE];
};
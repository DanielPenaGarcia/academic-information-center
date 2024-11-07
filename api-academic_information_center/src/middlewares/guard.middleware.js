import { environment } from "../environments/environment.js";
import jwt from "jsonwebtoken";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { API_NAME } from "../utils/constanst/api-name.constant.js";
import { byPass } from "../utils/functions/bypass.function.js";
import { logger } from "../config/log.config.js";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception.js";
import { getHeaderParam } from "../utils/functions/get-header-param.function.js";

export const guard = (req, res, next) => {
  try {
    const isPass = byPass(req);
    if (isPass) {
      return next();
    }
    const token = getHeaderParam({ req, param: "authorization" }).split(" ")[1];
    const decoded = jwt.verify(token, environment.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
};

const tokenFromCookie = (req) => {
  return req.cookies[TOKEN_COOKIE];
};
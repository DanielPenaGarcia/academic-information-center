import { environment } from "../environments/environment.js";
import jwt from "jsonwebtoken";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { API_NAME } from "../utils/constanst/api-name.constant.js";
import { byPass } from "../utils/functions/bypass.function.js";

export const guard = (req, res, next) => {
  try {
    const isPass = byPass(req);
    if (isPass) {
      return next();
    }
    const token = tokenFromCookie(req);
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    jwt.verify(token, environment.secretTokenKey, (error, decoded) => {
      if (error) {
        return res.status(401).send("Unauthorized");
      }
      req.user = decoded;
    });
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

const tokenFromCookie = (req) => {
  return req.cookies[TOKEN_COOKIE];
};

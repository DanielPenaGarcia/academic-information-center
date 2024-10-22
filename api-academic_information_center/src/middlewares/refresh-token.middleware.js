import e from "express";
import { environment } from "../environments/environment.js";
import { REFRESH_TOKEN_COOKIE } from "../utils/constanst/refresh-token-cookie.constant.js";
import jwt, { decode } from "jsonwebtoken";
import { generateToken } from "../utils/functions/generate-token.function.js";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { byPass } from "../utils/functions/bypass.function.js";

export const refreshToken = (req, res, next) => {
  try {
    const isPass = byPass(req);
    if (isPass) {
      return next();
    }
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
    if (!refreshToken) {
      return res.status(401).send("Unauthorized");
    }
    jwt.verify(
      refreshToken,
      environment.secretRefreshTokenKey,
      (error, decoded) => {
        if (error) {
          return res.status(401).send("Unauthorized");
        }
        const user = decoded;
        const token = generateToken({
          academicId: user.academicId,
          role: user.role,
        });
        res.cookie(TOKEN_COOKIE, token);
        next();
      }
    );
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

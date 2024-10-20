import { environment } from "../environments/environment.js";
import jwt from "jsonwebtoken";
import { TOKEN_COOKIE } from "../utils/constanst/token-cokie.constant.js";
import { API_NAME } from "../utils/constanst/api-name.constant.js";

const publicPaths = [
  `/${API_NAME}/auth/login/teachers`,
  `/${API_NAME}/auth/login/students`,
  `/${API_NAME}/auth/login/administrators`,
  `/${API_NAME}/auth/logout`,
];

export const guard = (req, res, next) => {
  try {
      const path = req.path;
    if (publicPaths.includes(path)) {
      return next();
    }
    const token = bearerToken(req);
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(token, environment.secretTokenKey);
    req.user = decoded;
    req.user.token = token;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

const bearerToken = (req) => {
  const authorization = req.headers["authorization"];
  return authorization.split(" ")[1];
};

import { environment } from "../../environments/environment.js";
import { TOKEN_REFRESH_EXPIRES } from "../constanst/token-refresh-expires.js";
import jwt from "jsonwebtoken";

export const generateRefreshToken = ({
  academicId,
  role,
  secretKey = environment.secretRefreshTokenKey,
  expiresIn = TOKEN_REFRESH_EXPIRES,
}) => {
  return jwt.sign({ academicId, role }, secretKey, { expiresIn: expiresIn });
};

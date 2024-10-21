import { environment } from "../../environments/environment.js";
import { TOKEN_EXPIRES } from "../constanst/token-expires.constant.js";
import jwt from "jsonwebtoken";

export const generateToken = ({
  academicId,
  role,
  secretKey = environment.secretTokenKey,
  expiresIn = TOKEN_EXPIRES,
}) => {
  return jwt.sign({ academicId, role }, secretKey, { expiresIn: expiresIn });
};
